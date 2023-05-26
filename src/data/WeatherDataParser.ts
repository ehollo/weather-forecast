import { Units } from "../context/WeatherContext";
import { isCurrentWeather, isHourlyWeather } from "./TimeSlots";
import { Weather, WeatherData } from "./WeatherData";
import {
  CommonWeather,
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  WeatherDataResponse,
} from "./WeatherDataResponse";

export const weatherDataParser = (
  weatherDataResp: WeatherDataResponse,
  units: Units
): WeatherData => {
  const weatherData: WeatherData = { current: {}, hourly: [], daily: [] };
  weatherData.current = currentDataParser(
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
const currentDataParser = (
  data: CurrentWeather,
  tSlot: string,
  units: Units
): Weather => {
  const commonWeather = hourlyDataParser(data, tSlot, units);
  const weather: Weather = {
    ...commonWeather,
    sunrise: data.sunrise ? `${data.sunrise}` : "",
    sunset: data.sunset ? `${data.sunset}` : "",
  };
  return weather;
};

const hourlyDataParser = (
  data: CurrentWeather | HourlyWeather,
  tSlot: string,
  units: Units
): Weather => {
  const commonWeather = dataParser(data, tSlot, units);
  const weather: Weather = {
    ...commonWeather,
    temp: data.temp ? `${data.temp}°` : "",
    feels_like: data.feels_like ? `${data.feels_like}°` : "",
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
    temp: data.temp ? `${data.temp.day}°` : "",
    feels_like: data.feels_like ? `${data.feels_like.day}°` : "",
    rain: data.rain ? `${data.rain}mm` : "",
    snow: data.snow ? `${data.snow}mm` : "",
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
    visibility:
      data.visibility && data.visibility < 1000 ? `${data.visibility}m` : "",
    wind: getWind(data.wind_speed, data.wind_deg, units),
    uvi: data.uvi ? `${data.uvi} of 10` : "",
    weather_main: data.weather.length > 0 ? data.weather[0].main : "",
    weather_description:
      data.weather.length > 0 ? data.weather[0].description : "",
    weather_icon:
      data.weather.length > 0
        ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        : "",
  };
  return weather;
};

const getTime = (timeStamp: number, tSlot: string): string => {
  const date = new Date(timeStamp * 1000);
  if (isCurrentWeather(tSlot)) {
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return time;
  } else if (isHourlyWeather(tSlot)) {
    return `${date.getHours()}`;
  } else {
    return `${date.getMonth() + 1}.${date.getDate()}`;
  }
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

const getWindDeg = (wind_deg: number): string => {
  if (wind_deg >= 0 && wind_deg < 22.5) {
    return "N";
  } else if (wind_deg >= 22.5 && wind_deg < 45) {
    return "NNE";
  } else if (wind_deg >= 45 && wind_deg < 67.5) {
    return "NE";
  } else if (wind_deg >= 67.5 && wind_deg < 90) {
    return "ENE";
  } else if (wind_deg >= 90 && wind_deg < 112.5) {
    return "E";
  } else if (wind_deg >= 112.5 && wind_deg < 135) {
    return "ESE";
  } else if (wind_deg >= 135 && wind_deg < 157.5) {
    return "SE";
  } else if (wind_deg >= 157.5 && wind_deg < 180) {
    return "SSE";
  } else if (wind_deg >= 180 && wind_deg < 202.5) {
    return "S";
  } else if (wind_deg >= 202.5 && wind_deg < 225) {
    return "SSW";
  } else if (wind_deg >= 225 && wind_deg < 247.5) {
    return "SW";
  } else if (wind_deg >= 247.5 && wind_deg < 270) {
    return "WSW";
  } else if (wind_deg >= 270 && wind_deg < 292.5) {
    return "W";
  } else if (wind_deg >= 292.5 && wind_deg < 315) {
    return "WNW";
  } else if (wind_deg >= 315 && wind_deg < 337.5) {
    return "NW";
  } else if (wind_deg >= 337.5 && wind_deg < 360) {
    return "NNW";
  }
  return "";
};
const getWeatherData = (
  weatherData: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[]
): {
  id: string;
  main: string;
  description: string;
  icon: string;
} | null => {
  const data = weatherData.length > 0 ? weatherData[0] : null;
  return (
    data && {
      id: `${data.id}`,
      main: data.main,
      description: data.description,
      icon: `https://openweathermap.org/img/wn/${data.icon}@2x.png`,
    }
  );
};
