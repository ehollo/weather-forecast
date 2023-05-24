export type WeatherData = {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

type Weather<T, U, V> = {
  dt: number | string;
  temp: T;
  feels_like: U;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  rain?: V;
};

export type CurrentWeather = Weather<number, number, { "1h": number }> & {
  sunrise: number;
  sunset: number;
};
export type HourlyWeather = Weather<number, number, { "1h": number }>;
export type DailyWeather = Weather<
  {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  },
  {
    day: number;
    night: number;
    eve: number;
    morn: number;
  },
  number
> & {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  rain?: number;
};

const nullWeather: CurrentWeather = {
  dt: 0,
  temp: 0,
  sunrise: 0,
  sunset: 0,
  feels_like: 0,
  pressure: 0,
  humidity: 0,
  dew_point: 0,
  uvi: 0,
  clouds: 0,
  visibility: 0,
  wind_speed: 0,
  wind_deg: 0,
  wind_gust: 0,
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
};

export const nullWeatherData: WeatherData = {
  current: nullWeather,
  hourly: [],
  daily: [],
};
