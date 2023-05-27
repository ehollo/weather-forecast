import * as React from "react";
import WeatherContext from "../context/WeatherContext";
import { Weather, WeatherData } from "../data/WeatherData";
import { weatherDataParser } from "../data/WeatherDataParser";
import { setStorageData, getStorageData } from "../data/StorageData";
import useLocation, { LocationCoords } from "./useLocation";
import { WeatherDataResponse } from "../data/WeatherDataResponse";
import useQuery from "./useQuery";

const useWeather = (initialTimeSlot: string) => {
  const { units } = React.useContext(WeatherContext);
  const [isDataStale, setIsDataStale] = React.useState(true);
  const [weatherData, setWeatherData] = React.useState<
    WeatherData | undefined
  >();
  const { coordinates, isLocationLoading, locationError } = useLocation();
  const [timeSlot, setTimeSlot] = React.useState(initialTimeSlot);
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
      setStorageData(wData.daily, timeSlot);
      setWeatherData(wData);
    };

    if (isDataStale && timerExpired && coordinates) {
      const dailyData: Weather[] = getStorageData(timeSlot);
      if (dailyData.length > 0) {
        weatherData && setWeatherData({ ...weatherData, daily: dailyData });
      } else {
        setIsDataStale(false);
        setTimerExpired(false);
        sendRequest({ requestUrl: createRequest(coordinates), handleData });
      }
    }
  }, [isDataStale, timerExpired, coordinates, timeSlot, sendRequest]);

  const createRequest = (coordinates: LocationCoords) => {
    const locationStr = `lat=${coordinates.lat}&lon=${coordinates.lon}`;
    const excludeStr = "&exclude=minutely,alerts";
    const API_key = "1cc2e654e0119e5e9aa46dac1cb59e42";
    const APIkey1 = "a23560fa3f2603966851cd344571833b";
    const unitsStr = units ? `&units=${units}` : "";
    return `https://api.openweathermap.org/data/3.0/onecall?${locationStr}${excludeStr}&appid=${API_key}${unitsStr}`;
  };

  return {
    isLoading: isLoading || isLocationLoading,
    error: `${locationError} ${error}`,
    weatherData,
    timeSlot,
    setTimeSlot: (newTimeSlot: string) => {
      setTimeSlot(newTimeSlot);
      setIsDataStale(true);
    },
  };
};

export default useWeather;
