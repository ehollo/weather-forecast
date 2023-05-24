import * as React from "react";
import { LocationCoords } from "../context/WeatherContext";

type FetchLocationWrapperProps = {
  coordinates: LocationCoords;
  isLocationLoading?: boolean;
  handleData(data: any): void;
};

const useFetchLocation = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchLocationWrapper = React.useCallback(
    async ({
      coordinates,
      isLocationLoading = false,
      handleData,
    }: FetchLocationWrapperProps) => {
      setIsLoading(true);
      setError(null);
      if (!isLocationLoading) {
        try {
          const response = await fetch(createRequest(coordinates));
          if (!response.ok) {
            throw new Error("Request failed!");
          }
          const data = await response.json();
          handleData(data[0]);
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
    const limitStr = `&limit=1`;
    const API_key = "1cc2e654e0119e5e9aa46dac1cb59e42";

    return `http://api.openweathermap.org/geo/1.0/reverse?${locationStr}&limit=1&appid=${API_key}`;
  };

  return {
    isLoading,
    error,
    fetchLocationWrapper,
  };
};

export default useFetchLocation;
