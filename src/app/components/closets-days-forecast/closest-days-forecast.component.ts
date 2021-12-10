import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FiltersService } from '../../filters.service';
import { OpenweathermapService } from '../../services/openweathermap.service';
import { IForecastData } from '../../shared/interfaces/forecast-data.interface';
import { IDateRange } from '../../shared/interfaces/date-range.interface';

@Component({
  selector: 'app-closest-days-forecast',
  templateUrl: './closest-days-forecast.component.html',
  styleUrls: ['./closest-days-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClosestDaysForecastComponent implements OnInit, OnDestroy {

  forecastData?: IForecastData[];

  private _ngUnsubscribe$ = new Subject();

  constructor(private _openweathermap: OpenweathermapService,
              private _filter: FiltersService,
              private _cdr: ChangeDetectorRef) {
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this._updateChart();

    this._filter.dateRangeChanges$
      .pipe(takeUntil(this._ngUnsubscribe$))
      .subscribe((value) => {
        this._updateChart(value);
      });
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  private _updateChart(value?: IDateRange): void {
    this._openweathermap.getForecast(10, value?.startDateTimeUtc, value?.endDateTimeUtc)
      .subscribe((result) => {
        this.forecastData = result;
        this._cdr.detectChanges();
      });
  }
}
