import * as React from "react";

export type LocationData = {
  city: string;
  country: string;
};

export type LocationCoords = {
  lat: number;
  lon: number;
};

export type Units = "metric" | "imperial";

export type WeatherContextType = {
  location: LocationData;
  coordinates: LocationCoords;
  units: Units;
  setLocation(location: LocationData): void;
  setCoordinates(coordinates: LocationCoords): void;
  setUnits(units: Units): void;
};

const WeatherContext = React.createContext<WeatherContextType>({
  location: { city: "", country: "" },
  coordinates: { lat: 0, lon: 0 },
  units: "metric",
  setLocation(location) {},
  setCoordinates(coordinates) {},
  setUnits(units) {},
});

export default WeatherContext;
