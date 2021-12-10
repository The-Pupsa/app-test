import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FiltersService } from '../../filters.service';
import { OpenweathermapService } from '../../services/openweathermap.service';
import { IForecastData } from '../../shared/interfaces/forecast-data.interface';
import { YAXisOptionSeries } from '../../../charts/shared/types/YAXis-option-series.type';
import { YAXISSETTINGS } from '../../shared/constants/yAxisSettings.constant';
import { IDateRange } from '../../shared/interfaces/date-range.interface';
import { CHART_TYPE } from '../../../charts/shared/constants/chart-type.constant';
import { ForecastSettingsService } from '../../services/forecast-settings.service';
import { ForecastSettingsFormgroup } from '../../classes/forecast-settings-formgroup';

@Component({
  selector: 'app-forecast-chart3',
  templateUrl: './forecast-chart3.component.html',
  styleUrls: ['./forecast-chart3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastChart3Component implements OnInit, OnDestroy {

  rawEntries?: IForecastData[];

  yAxis: YAXisOptionSeries[];

  chartTypes = Object.values(CHART_TYPE);

  formGroup = new ForecastSettingsFormgroup();

  private _ngUnsubscribe$ = new Subject();

  constructor(private _openweathermap: OpenweathermapService,
              private _forecastSettings: ForecastSettingsService,
              private _filter: FiltersService,
              private _cdr: ChangeDetectorRef) {

    this._updateChart();

    this.yAxis = [
      YAXISSETTINGS.wind,
      YAXISSETTINGS.temperature,
    ];
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this._filter.dateRangeChanges$
      .pipe(takeUntil(this._ngUnsubscribe$))
      .subscribe((value) => {
        this._updateChart(value);
      });

    this.formGroup.valueChanges
      .subscribe(value => {
        this.yAxis = this._forecastSettings.getUpdatedSettings(value, this.yAxis);
      });
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  private _updateChart(value?: IDateRange): void {
    this._openweathermap.getForecast(undefined, value?.startDateTimeUtc, value?.endDateTimeUtc)
      .subscribe((result) => {
        this.rawEntries = result;
        this._cdr.detectChanges();
      });
  }
}
