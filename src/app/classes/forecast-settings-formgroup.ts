import { FormControl, FormGroup } from '@angular/forms';
import { ISeries } from '../../charts/shared/interfaces/series.interfaces';
import { YAXisOptionSeries } from '../../charts/shared/types/YAXis-option-series.type';
import { YAXISSETTINGS } from '../shared/constants/yAxisSettings.constant';

export class ForecastSettingsFormgroup extends FormGroup {
  constructor() {
    super({
      'Temperature (feels like)': new FormControl(),
      'Temperature': new FormControl(),
      'Wind speed': new FormControl(),
      'Humidity': new FormControl(),
      'Pressure': new FormControl(),
    });

    this._patchValues();
  }

  private _patchValues(): void {
    Object.keys(this.value).forEach(key => {
      this.get(key)?.setValue(this._getTypeInitialValue(key));
    });
  }

  private _getTypeInitialValue(sensor: string): string {
    const series = Object.values(YAXISSETTINGS)
      .reduce((acc: ISeries[], current: YAXisOptionSeries) => [...acc, ...current.series], [] as ISeries[]);

    return series.find(item => item.name === sensor)?.type || 'line';
  }
}
