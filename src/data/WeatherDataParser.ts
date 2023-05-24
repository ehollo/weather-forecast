import { CurrentWeather, HourlyWeather, WeatherData } from "./WeatherData";

export const weatherDataParser = (weatherData: WeatherData) => {
  dataParser(weatherData.current);
};

const dataParser = (data: CurrentWeather | HourlyWeather) => {
  for (const key in data) {
    switch (key) {
      case "dt":
        data.dt = getTime(data.dt as number);
    }
  }
};

const getTime = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000);
  const time = `${date.getHours()} ${date.getMinutes()}`;
  return time;
};
