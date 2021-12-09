import { Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import ResizeObserver from 'resize-observer-polyfill';
import { asyncScheduler, Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { EChartsOption, ECharts } from 'echarts';
import * as echarts from 'echarts';
import { ChartDatasetService } from './chart-dataset.service';
import { _getShadowRoot } from '@angular/cdk/platform';

/** Directive for building charts */
@Directive({
  selector: '[appChart]'
})
export class ChartDirective<T> implements OnInit, OnChanges, OnDestroy {

  @Input()
  set entries(b: T[]) {
    this._entries = b;
  }

  get entries(): T[] {
    return this._entries;
  }

  @Input() type: string = 'line';
  @Input() seriesProperty: string = '';
  @Input() amountProperty: string = '';

  public animationFrameID?: number;

  private _entries: T[] = []
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
  ngOnChanges(changes: SimpleChanges): void {
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

    const dataset = this._chartDataset.getDataset(this.entries);
    const series = this._chartDataset.getSeries(this.seriesProperty, this.entries);
    const datasetWithFilters = this.type === 'line' ? this._chartDataset.getDatasetWithFilters(series, this.seriesProperty) : [];
    const seriesList = this._getSeriesList(series);

    // specify chart configuration item and data
    let option: EChartsOption = {
      animationDuration: 2000,
      legend: {
        orient: 'horizontal',
        bottom: 'bottom'
      },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      series: seriesList
    };

    if (this.type === 'line') {
      option = {
        ...option, ...{
          dataset: [
            {
              id: 'dataset_raw',
              source: dataset
            },
            ...datasetWithFilters
          ],
          xAxis: {
            type: 'category',
            nameLocation: 'middle'
          },
          yAxis: {
            name: this.amountProperty
          },
        }
      };
    }

    // use configuration item and data specified to show chart
    this._chart?.setOption(option);
  }

  // TODO разобраться с настройками библиотеки
  private _getSeriesList(series: string[]): any[] {
    const seriesList: any[] = [];

    if (this.type === 'pie') {
      seriesList.push(
        {
          type: 'pie',
          id: 'pie',
          radius: '50%',
          center: ['50%', '35%'],
          data: this._chartDataset.getDataSetForPie(series, this.entries, this.amountProperty, this.seriesProperty),
        }
      );

      return seriesList;
    }

    series.forEach(s => {
      const datasetId = 'dataset_' + s;
      seriesList.push({
        type: this.type,
        smooth: true,
        radius: '50%',
        datasetId,
        name: s,
        emphasis: {
          focus: 'series'
        },
        encode: {
          x: 'DateISO',
          y: this.amountProperty,
          label: ['System', this.amountProperty],
          itemName: 'DateISO',
          tooltip: [this.amountProperty]
        }
      });
    });
    return seriesList;
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
