import { YAXisOptionSeries } from '../../../charts/shared/types/YAXis-option-series.type';

// Базовые настройки
export const YAXISSETTINGS: { [key: string]: YAXisOptionSeries } = {
  temperature: {
    type: 'value',
    name: 'Temperature',
    min: 240,
    max: 340,
    interval: 10,
    axisLabel: {
      formatter: '{value}°F'
    },
    series: [
      {
        name: 'Temperature (feels like)',
        type: 'line',
        dataRoute: 'main.temp',
        show: true,
      },
      {
        name: 'Temperature',
        type: 'line',
        dataRoute: 'main.feels_like',
        show: true,
      }
    ]
  },
  humidity: {
    type: 'value',
    name: 'Humidity',
    min: 0,
    max: 100,
    interval: 10,
    axisLabel: {
      formatter: '{value}%'
    },
    series: [
      {
        name: 'Humidity',
        type: 'bar',
        dataRoute: 'main.humidity',
        show: true,
      }]
  },
  pressure: {
    type: 'value',
    name: 'Pressure',
    min: 500,
    max: 1500,
    interval: 100,
    axisLabel: {
      formatter: '{value}mm. rt. st'
    },
    series: [
      {
        name: 'Pressure',
        type: 'line',
        dataRoute: 'main.pressure',
        show: true,
      }]
  },
  wind: {
    type: 'value',
    name: 'Wind speed',
    min: 0,
    max: 20,
    interval: 2,
    axisLabel: {
      formatter: '{value}m/sec'
    },
    series: [
      {
        name: 'Wind speed',
        type: 'line',
        dataRoute: 'wind.speed',
        show: true,
      }]
  },
};
