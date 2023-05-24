import * as React from "react";
import { LocationCoords } from "../context/WeatherContext";

type FetcWeatherhWrapperProps = {
  coordinates: LocationCoords;
  isLocationLoading?: boolean;
  handleData(data: any): void;
};

const useFetchWeather = () => {
  const [isRequestToSend, setRequestToSend] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setInterval(() => {
      setRequestToSend(true);
    }, 600000);
  }, []);

  const fetchWeatherWrapper = React.useCallback(
    async ({
      coordinates,
      isLocationLoading = false,
      handleData,
    }: FetcWeatherhWrapperProps) => {
      if (isRequestToSend) {
        setRequestToSend(false);
        setIsLoading(true);
        setError(null);

        if (!isLocationLoading) {
          try {
            const response = await fetch(createRequest(coordinates));
            if (!response.ok) {
              throw new Error("Request failed!");
            }

            const data = await response.json();
            handleData(data);
          } catch (err) {
            setError(err.message || "Something went wrong!");
          }
        }
        setIsLoading(false);
      }
    },
    [isRequestToSend]
  );

  const createRequest = (coordinates: LocationCoords) => {
    const locationStr = `lat=${coordinates.lat}&lon=${coordinates.lon}`;
    const excludeStr = "&exclude=minutely,alerts";
    const API_key = "1cc2e654e0119e5e9aa46dac1cb59e42";
    const APIkey1 = "a23560fa3f2603966851cd344571833b";

    return `https://api.openweathermap.org/data/3.0/onecall?${locationStr}${excludeStr}&appid=${API_key}`;
  };

  return {
    isLoading,
    error,
    fetchWeatherWrapper,
  };
};

export default useFetchWeather;
