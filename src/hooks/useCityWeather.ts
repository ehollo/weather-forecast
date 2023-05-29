import * as React from "react";
import WeatherContext, { Units } from "../context/WeatherContext";
import { WeatherData } from "../data/WeatherData";
import { weatherDataParser } from "../data/WeatherDataParser";
import { LocationCoords } from "./useLocation";
import { WeatherDataResponse } from "../data/WeatherDataResponse";
import useQuery from "./useQuery";

const useCityWeather = (coordinates: LocationCoords) => {
  const { units } = React.useContext(WeatherContext);
  const [weatherData, setWeatherData] = React.useState<
    WeatherData | undefined
  >();
  const [timerExpired, setTimerExpired] = React.useState(true);
  const { isLoading, error, sendRequest } = useQuery();

  React.useEffect(() => {
    setInterval(() => {
      setTimerExpired(true);
    }, 600000);
  }, []);

  React.useEffect(() => {
    const handleData = (data: WeatherDataResponse) => {
      const wData: WeatherData = weatherDataParser(data, units);
      setWeatherData(wData);
    };

    setTimerExpired(false);
    sendRequest({
      requestUrl: createRequest(coordinates, units),
      handleData,
    });
  }, [timerExpired, units, sendRequest]);

  const createRequest = (coordinates: LocationCoords, units: Units) => {
    const locationStr = `lat=${coordinates.lat}&lon=${coordinates.lon}`;
    const excludeStr = "&exclude=minutely,hourly, daily,alerts";
    const API_key = "1cc2e654e0119e5e9aa46dac1cb59e42";
    const APIkey1 = "a23560fa3f2603966851cd344571833b";
    const unitsStr = units ? `&units=${units}` : "";
    return `https://api.openweathermap.org/data/3.0/onecall?${locationStr}${excludeStr}&appid=${API_key}${unitsStr}`;
  };

  return {
    isLoading,
    error,
    weatherData,
  };
};

export default useCityWeather;
