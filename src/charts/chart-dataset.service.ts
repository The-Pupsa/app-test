import { Injectable } from '@angular/core';
import { IData } from './shared/interfaces/data.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartDatasetService {

  constructor() {
  }

  getDataset<T>(entries: T[]): Array<Array<unknown>> {
    const dataset: Array<Array<unknown>> = entries.map((entry: T) => {
      return Object.values(entry);
    });

    const [firstRecord] = entries;
    if (firstRecord) {
      dataset.unshift(Object.keys(firstRecord));
    }
    return dataset;
  }

  getSeries<T>(propertyName: string, entries: T[]): string[] {
    const allValues = entries.reduce((acc, current: any) => {
      const currentValue: string = current[propertyName] as string;
      return [...acc, currentValue];
    }, [] as string[]);

    return Array.from(new Set(allValues));
  }

  getDatasetWithFilters<T>(series: string[], propertyName: string): any[] {
    const datasetWithFilters: any[] = [];
    series.forEach(s => {
      const datasetId = 'dataset_' + s;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              {dimension: propertyName, '=': s}
            ]
          }
        }
      });

    });
    return datasetWithFilters;
  }

  getDataSetForPie<T>(series: string[], entries: T[], propertyName: string, seriesProperty: string): IData[] {
    return entries.reduce((acc, current: any) => {
      const value: number = parseFloat(current[propertyName]);
      const name: string = current[seriesProperty] as string;
      const foundedValue = acc.find(item => item.name === name);
      if (foundedValue) {
        foundedValue.value += value;
      } else {
        acc.push({
          name,
          value,
        });
      }
      return acc;
    }, [] as IData[]);
  }
}
