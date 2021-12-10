import { Injectable } from '@angular/core';
import { YAXisOptionSeries } from '../../charts/shared/types/YAXis-option-series.type';

@Injectable({
  providedIn: 'root'
})
export class ForecastSettingsService {

  getUpdatedSettings(value: { [key: string]: string },
                     yAxis: YAXisOptionSeries[]): YAXisOptionSeries[] {
    const newYAxis = [...yAxis];
    Object.keys(value).forEach((key: string) => {
      newYAxis.forEach(item => {
        item.series.forEach((s) => {
          if (s.name === key) {
            if (value[key] === 'none') {
              s.show = false;
            } else {
              s.show = true;
              s.type = value[key];
            }
          }
        });
      });
    });
    return newYAxis;
  }
}
