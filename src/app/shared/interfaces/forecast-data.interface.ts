export interface IForecastData {
  clouds: {
    all: number;
  };
  dt: number;
  date: Date;
  dt_text: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}
