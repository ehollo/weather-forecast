import * as React from "react";
import WeatherContext, { LocationCoords } from "../context/WeatherContext";
import { isDailyWeather } from "../data/TimeSlots";
import { WeatherDataResponse } from "../data/WeatherDataResponse";
import { Weather, WeatherData } from "../data/WeatherData";
import { weatherDataParser } from "../data/WeatherDataParser";

type FetcWeatherhWrapperProps = {
  coordinates: LocationCoords;
  isLocationLoading?: boolean;
  handleData(data: WeatherData): void;
};

const useFetchWeather = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { units } = React.useContext(WeatherContext);

  const fetchWeatherWrapper = React.useCallback(
    async ({
      coordinates,
      isLocationLoading = false,
      handleData,
    }: FetcWeatherhWrapperProps) => {
      setIsLoading(true);
      setError(null);

      if (!isLocationLoading) {
        try {
          const response = await fetch(createRequest(coordinates));
          if (!response.ok) {
            throw new Error("Request failed!");
          }

          const data = await response.json();
          const weatherData: WeatherData = weatherDataParser(data, units);
          handleData(weatherData);
        } catch (err) {
          setError(err.message || "Something went wrong!");
        }
      }
      setIsLoading(false);
    },
    []
  );

  const createRequest = (coordinates: LocationCoords) => {
    const locationStr = `lat=${coordinates.lat}&lon=${coordinates.lon}`;
    const excludeStr = "&exclude=minutely,alerts";
    const API_key = "1cc2e654e0119e5e9aa46dac1cb59e42";
    const APIkey1 = "a23560fa3f2603966851cd344571833b";
    const unitsStr = units ? `&units=${units}` : "";

    return `https://api.openweathermap.org/data/3.0/onecall?${locationStr}${excludeStr}&appid=${API_key}${unitsStr}`;
  };

  return {
    isLoading,
    error,
    fetchWeatherWrapper,
  };
};

export default useFetchWeather;
