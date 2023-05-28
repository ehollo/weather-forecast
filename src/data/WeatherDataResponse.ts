export type WeatherDataResponse = {
  current: HourlyWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

export type CommonWeather = {
  dt: number;
  humidity: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  sunrise?: number;
  sunset?: number;
  moonrise?: number;
  moonset?: number;
};

export type HourlyWeather = CommonWeather & {
  temp: number;
  feels_like: number;
  rain?: { "1h": number };
  snow?: { "1h": number };
};

export type DailyWeather = CommonWeather & {
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  rain?: number;
  snow?: number;
};
