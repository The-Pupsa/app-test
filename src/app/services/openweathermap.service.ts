import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IForecastDataResponse } from '../shared/interfaces/forecast-data-response.interface';
import { IForecastData } from '../shared/interfaces/forecast-data.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenweathermapService {

  constructor(private _http: HttpClient) {
  }

  // TODO убрать параметры куда-то в настройки
  getForecast(cnt?: number,
              startDate?: Date,
              endDate?: Date,
              cityName: string = 'sochi',
              appid: string = 'dabc2b57d81c4493c08ab63bb4d9e326'): Observable<IForecastData[]> {

    return this._http.get<IForecastDataResponse>(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${appid}`)
      .pipe(
        switchMap((result) => {
          let list = result.list;
          list.forEach((item: IForecastData) => {
            item.date = new Date(item.dt * 1000);
          });

          // нет дат в параметрах API
          const date = new Date(); // Now
          date.setDate(date.getDate() + 30);

          list = list.filter(item => item.date < (endDate || date)
            && item.date > (startDate || new Date()))
            .slice(0, cnt || 1000);

          return of(list);
        })
      );
  }
}
