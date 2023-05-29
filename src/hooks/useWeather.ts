import * as React from "react";
import WeatherContext, { Units } from "../context/WeatherContext";
import { Weather, WeatherData } from "../data/WeatherData";
import { weatherDataParser } from "../data/WeatherDataParser";
import {
  setWeatherStorageData,
  getWeatherStorageData,
} from "../data/StorageData";
import useLocation, { LocationCoords } from "./useLocation";
import { WeatherDataResponse } from "../data/WeatherDataResponse";
import useQuery from "./useQuery";

const useWeather = (initialTimeSlot: string) => {
  const { units } = React.useContext(WeatherContext);
  const [prevUnits, setPrevUnits] = React.useState(units);
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
      setWeatherStorageData(wData.daily);
      setWeatherData(wData);
    };

    const isUnitsChanged = units != prevUnits;

    if (((isDataStale && timerExpired) || isUnitsChanged) && coordinates) {
      const dailyData: Weather[] = isUnitsChanged
        ? []
        : getWeatherStorageData(timeSlot);

      if (dailyData.length > 0) {
        weatherData && setWeatherData({ ...weatherData, daily: dailyData });
      } else {
        setIsDataStale(false);
        setTimerExpired(false);
        sendRequest({
          requestUrl: createRequest(coordinates, units),
          handleData,
        });
      }
    }
    setPrevUnits(units);
  }, [isDataStale, timerExpired, coordinates, units, timeSlot, sendRequest]);

  const createRequest = (coordinates: LocationCoords, units: Units) => {
    const locationStr = `lat=${coordinates.lat}&lon=${coordinates.lon}`;
    const excludeStr = "&exclude=minutely,alerts";
    const API_key = "1cc2e654e0119e5e9aa46dac1cb59e42";
    const APIkey1 = "a23560fa3f2603966851cd344571833b";
    const unitsStr = units ? `&units=${units}` : "";
    return `https://api.openweathermap.org/data/3.0/onecall?${locationStr}${excludeStr}&appid=${API_key}${unitsStr}`;
  };

  return {
    isLoading: isLoading || isLocationLoading,
    error: locationError ? locationError : error,
    weatherData,
    timeSlot,
    setTimeSlot: (newTimeSlot: string) => {
      setTimeSlot(newTimeSlot);
      setIsDataStale(true);
    },
  };
};

export default useWeather;
