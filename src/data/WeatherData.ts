export type WeatherData = {
  current: Weather;
  hourly: Weather[];
  daily: Weather[];
};

export type Weather = {
  time?: string;
  temp?: string;
  temp_day?: string;
  temp_min?: string;
  temp_max?: string;
  temp_night?: string;
  temp_eve?: string;
  temp_morn?: string;
  feels_like?: string;
  feels_like_day?: string;
  feels_like_night?: string;
  feels_like_eve?: string;
  feels_like_morn?: string;
  humidity?: string;
  uvi?: string;
  clouds?: string;
  visibility?: string;
  wind?: string;
  weather_main?: string;
  weather_description?: string;
  weather_icon?: string;

  // weather?: {
  //   id: string;
  //   main: string;
  //   description: string;
  //   icon: string;
  // } | null;
  rain?: string;
  snow?: string;
  sunrise?: string;
  sunset?: string;
  moonrise?: string;
  moonset?: string;
};

const nullWeather: Weather = {};

export const nullWeatherData: WeatherData = {
  current: {},
  hourly: [],
  daily: [],
};
