import * as React from "react";
import WeatherContext, { LocationCoords } from "../context/WeatherContext";
import useFetchLocation from "./use-fetch-location";

export type Place = {
  current: boolean;
  cityName?: string;
};

const CityLocations: Map<string, LocationCoords> = new Map<
  string,
  LocationCoords
>([["London, GB", { lat: 51.5085, lon: -0.1257 }]]);

type LocationDataType = {
  name: string;
  country: string;
};

const useLocation = () => {
  const [isLocationLoading, setLocationLoading] = React.useState(false);
  const [locationError, setLocationError] = React.useState("");
  const { isLoading, error, fetchLocationWrapper } = useFetchLocation();
  const { setCoordinates, setLocation } = React.useContext(WeatherContext);
  const locationCallback = React.useCallback(async (place: Place) => {
    const handleData = (data: LocationDataType) => {
      setLocation({ city: data.name, country: data.country });
    };

    const handleSuccess = (position: GeolocationPosition) => {
      setCoordinates({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      fetchLocationWrapper({
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        isLocationLoading: false,
        handleData,
      });
      setLocationLoading(false);
    };

    const handleError = () => {
      setLocationError("Unable to retrieve your location! ");
    };

    if (place.current) {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser! ");
      } else {
        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
      }
    } else {
      const loc = place.cityName && CityLocations.get(place.cityName);
      if (!loc) {
        setLocationError("City location is not defined! ");
      } else {
        setCoordinates(loc);
      }
    }
  }, []);
  return {
    isLocationLoading: isLocationLoading,
    locationError: `${locationError}${error}`,
    locationCallback,
  };
};

export default useLocation;
