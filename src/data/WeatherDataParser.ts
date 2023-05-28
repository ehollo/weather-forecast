import { Units } from "../context/WeatherContext";
import { isCurrentTimeSlot, isHourlyTimeSlot } from "./TimeSlots";
import { Weather, WeatherData } from "./WeatherData";
import {
  CommonWeather,
  HourlyWeather,
  DailyWeather,
  WeatherDataResponse,
} from "./WeatherDataResponse";

export const weatherDataParser = (
  weatherDataResp: WeatherDataResponse,
  units: Units
): WeatherData => {
  const weatherData: WeatherData = { current: {}, hourly: [], daily: [] };
  weatherData.current = hourlyDataParser(
    weatherDataResp.current,
    "Current",
    units
  );
  for (let i: number = 0; i < 12; i++) {
    weatherData.hourly[i] = hourlyDataParser(
      weatherDataResp.hourly[i],
      "Hourly",
      units
    );
  }
  for (let i: number = 0; i < 6; i++) {
    weatherData.daily[i] = dailyDataParser(
      weatherDataResp.daily[i],
      "Daily",
      units
    );
  }

  return weatherData;
};

const hourlyDataParser = (
  data: HourlyWeather,
  tSlot: string,
  units: Units
): Weather => {
  const commonWeather = dataParser(data, tSlot, units);
  const weather: Weather = {
    ...commonWeather,
    temp: data.temp ? `${Math.round(data.temp)}°` : "",
    feels_like: data.feels_like ? `${Math.round(data.feels_like)}°` : "",
    rain: data.rain ? `${data.rain["1h"]}mm` : "",
    snow: data.snow ? `${data.snow["1h"]}mm` : "",
  };
  return weather;
};

const dailyDataParser = (
  data: DailyWeather,
  tSlot: string,
  units: Units
): Weather => {
  const commonWeather = dataParser(data, tSlot, units);
  const weather: Weather = {
    ...commonWeather,
    temp: data.temp ? `${Math.round(data.temp.day)}°` : "",
    feels_like: data.feels_like ? `${Math.round(data.feels_like.day)}°` : "",
    rain: data.rain ? `${data.rain}mm` : "",
    snow: data.snow ? `${data.snow}mm` : "",
    temp_day: data.temp.day ? `${Math.round(data.temp.day)}°` : "",
    temp_min: data.temp.min ? `${Math.round(data.temp.min)}°` : "",
    temp_max: data.temp.max ? `${Math.round(data.temp.max)}°` : "",
    temp_night: data.temp.night ? `${Math.round(data.temp.night)}°` : "",
    temp_eve: data.temp.eve ? `${Math.round(data.temp.eve)}°` : "",
    temp_morn: data.temp.morn ? `${Math.round(data.temp.morn)}°` : "",
    feels_like_day: data.feels_like.day
      ? `${Math.round(data.feels_like.day)}°`
      : "",
    feels_like_night: data.feels_like.night
      ? `${Math.round(data.feels_like.night)}°`
      : "",
    feels_like_eve: data.feels_like.eve
      ? `${Math.round(data.feels_like.eve)}°`
      : "",
    feels_like_morn: data.feels_like.morn
      ? `${Math.round(data.feels_like.morn)}°`
      : "",
  };
  return weather;
};

const dataParser = (
  data: CommonWeather,
  tSlot: string,
  units: Units
): Weather => {
  const weather: Weather = {
    time: getTime(data.dt, tSlot),
    humidity: data.humidity ? `${data.humidity}%` : "",
    clouds: data.clouds ? `${data.clouds}%` : "",
    visibility: data.visibility ? getVisibility(data.visibility, units) : "",
    wind: getWind(data.wind_speed, data.wind_deg, units),
    uvi: data.uvi ? `${data.uvi} of 10` : "",
    weather_main: data.weather.length > 0 ? data.weather[0].main : "",
    weather_description:
      data.weather.length > 0 ? capitalize(data.weather[0].description) : "",
    weather_icon:
      data.weather.length > 0
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        : "",
    sunrise: data.sunrise ? `${getTime(data.sunrise)}` : "",
    sunset: data.sunset ? `${getTime(data.sunset)}` : "",
    moonrise: data.moonrise ? `${getTime(data.moonrise)}` : "",
    moonset: data.moonset ? `${getTime(data.moonset)}` : "",
  };
  return weather;
};

const getTime = (timeStamp: number, tSlot: string = "Current"): string => {
  const date = new Date(timeStamp * 1000);
  if (isCurrentTimeSlot(tSlot)) {
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return time;
  } else if (isHourlyTimeSlot(tSlot)) {
    return `${date.getHours()}`;
  } else {
    return `${date.getMonth() + 1}.${date.getDate()}`;
  }
};

const getVisibility = (visibility: number, units: Units): string => {
  return units === "metric"
    ? visibility > 1000
      ? `${(visibility / 1000).toFixed(1)}km`
      : `${visibility}m`
    : `${(visibility * 0.00062137).toFixed(2)}miles`;
};

const capitalize = (description: string): string => {
  const firstChar = description[0].toUpperCase();
  return `${firstChar}${description.slice(1)}`;
};

const getWind = (
  wind_speed: number,
  wind_deg: number,
  units: Units
): string => {
  const windD = wind_deg ? `${getWindDeg(wind_deg)} ` : "";
  const windS = wind_speed ? `${getWindSpeed(wind_speed, units)}` : "";
  return `${windD}${windS}`;
};

const getWindSpeed = (wind_speed: number, units: Units): string => {
  return units === "metric"
    ? `${(wind_speed * 3.6).toFixed(1)} km/h`
    : `${wind_speed.toFixed(1)} miles/h`;
};

const WindStr = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

const getWindDeg = (wind_deg: number): string => {
  const windVal = Math.floor(wind_deg / 22.5);
  return windVal >= 0 && windVal < 16 ? WindStr[windVal] : "";
};
