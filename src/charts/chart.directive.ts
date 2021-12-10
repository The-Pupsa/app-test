import { Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit } from '@angular/core';

import ResizeObserver from 'resize-observer-polyfill';
import { asyncScheduler, Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { EChartsOption, ECharts } from 'echarts';
import * as echarts from 'echarts';

import { ChartDatasetService } from './chart-dataset.service';
import { YAXisOptionSeries } from './shared/types/YAXis-option-series.type';

/** Directive for building charts */
@Directive({
  selector: '[appChart]'
})
export class ChartDirective<T> implements OnInit, OnChanges, OnDestroy {

  @Input() entries: T[] = [];
  @Input()  yAxis: YAXisOptionSeries[] = [];
  @Input() xAxis: string = '';

  public animationFrameID?: number;

  private _resizeOb?: ResizeObserver;
  private _resize$ = new Subject<void>();
  private _resizeSub?: Subscription;
  private _chart?: ECharts;

  constructor(
    private _el: ElementRef,
    private _chartDataset: ChartDatasetService,
    private _ngZone: NgZone,
  ) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    // based on prepared DOM, initialize echarts instance
    this._chart = echarts.init(this._el.nativeElement);

    this._initChartOptions();

    this._resizeSub = this._resize$.pipe(
      throttleTime(100, asyncScheduler, {leading: false, trailing: true})
    ).subscribe(() => this.resize());

    this._resizeOb = this._ngZone.runOutsideAngular(() => new ResizeObserver(() => {
      this.animationFrameID = window.requestAnimationFrame(() => this._resize$.next());
    }));
    this._resizeOb?.observe(this._el.nativeElement);
  }

  /** @inheritDoc */
  ngOnChanges(): void {
    this._initChartOptions();
  }

  /** @inheritDoc */
  ngOnDestroy(): void {
    if (this._resizeSub) {
      this._resizeSub.unsubscribe();
    }
    if (this.animationFrameID) {
      window.cancelAnimationFrame(this.animationFrameID);
    }
    if (this._resizeOb) {
      this._resizeOb.unobserve(this._el.nativeElement);
    }
    this._dispose();
  }

  /** Resize chart */
  resize(): void {
    if (this._chart) {
      this._chart.resize();
    }
  }

  private _initChartOptions(): void {
    this._chart?.clear();

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        }
      },
      legend: {
        show: true
      },
      xAxis: [
        {
          data: this._chartDataset.getXAxis(this.entries, this.xAxis),
        }
      ],
      yAxis: this.yAxis,
      series: this._chartDataset.getSeries(this.entries, this.yAxis),
    };

    // use configuration item and data specified to show chart
    this._chart?.setOption(option);
  }

  /** Dispose chart */
  private _dispose(): void {
    if (this._chart) {
      if (!this._chart.isDisposed()) {
        this._chart.dispose();
      }
      this._chart = undefined;
    }
  }
}
