import { Injectable } from '@angular/core';
import { SeriesOption$1 } from './shared/types/series-option$1.type';
import { YAXisOptionSeries } from './shared/types/YAXis-option-series.type';
import {
  get as _get,
} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ChartDatasetService {

  constructor() {
  }

  // TODO типизация
  getXAxis<T>(entries: T[], property: string): any[] {
    if (!property) {
      return [];
    }

    return entries.map((entry: any) => entry[property]);
  }

  getSeries<T>(entries: T[], yAxis: YAXisOptionSeries[]): SeriesOption$1[] {
    const series: SeriesOption$1[] = [];
    yAxis?.forEach((item, index) => {
      item.series.forEach(s => {
        series.push(
          {
            name: s.name,
            type: s.type,
            yAxisIndex: index,
            data: s.show && this._getRow(entries, s.dataRoute),
          }
        );
      });
    });

    return series;
  }

  private _getRow<T>(entries: T[], dataRoute: string): any[] {
    return entries.map(entry => _get(entry, dataRoute));
  }
}
