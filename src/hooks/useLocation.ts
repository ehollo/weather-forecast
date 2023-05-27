import * as React from "react";
import useQuery from "./useQuery";

export type LocationData = {
  city: string;
  country: string;
};

export type LocationCoords = {
  lat: number;
  lon: number;
};

type LocationDataType = {
  name: string;
  country: string;
};

const useLocation = () => {
  const [isLocationLoading, setLocationLoading] = React.useState(false);
  const [locationError, setLocationError] = React.useState("");
  const { error, sendRequest } = useQuery();
  const [coordinates, setCoordinates] = React.useState<
    LocationCoords | undefined
  >();
  const [location, setLocation] = React.useState<LocationData | undefined>();

  React.useEffect(() => {
    const handleData = (data: LocationDataType[]) => {
      data!.length > 0 &&
        setLocation({ city: data[0].name, country: data[0].country });
    };

    const handleSuccess = (position: GeolocationPosition) => {
      setCoordinates({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });

      sendRequest({
        requestUrl: createRequest({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
        handleData,
      });
      setLocationLoading(false);
    };

    const handleError = () => {
      setLocationError("Unable to retrieve your location! ");
    };

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser! ");
    } else {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }
  }, []);

  const createRequest = (coordinates: LocationCoords) => {
    const locationStr = `lat=${coordinates.lat}&lon=${coordinates.lon}`;
    const API_key = "1cc2e654e0119e5e9aa46dac1cb59e42";

    return `http://api.openweathermap.org/geo/1.0/reverse?${locationStr}&limit=1&appid=${API_key}`;
  };

  return {
    coordinates,
    location,
    isLocationLoading,
    locationError: `${locationError}${error}`,
  };
};

export default useLocation;
