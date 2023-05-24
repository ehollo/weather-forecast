import * as React from "react";

export type LocationData = {
  city: string;
  country: string;
};

export type LocationCoords = {
  lat: number;
  lon: number;
};

export type TempMetric = "Celsius" | "Farenheit";

export type WeatherContextType = {
  location: LocationData;
  coordinates: LocationCoords;
  metric: TempMetric;
  setLocation(location: LocationData): void;
  setCoordinates(coordinates: LocationCoords): void;
  setMetric(metric: TempMetric): void;
};

const WeatherContext = React.createContext<WeatherContextType>({
  location: { city: "", country: "" },
  coordinates: { lat: 0, lon: 0 },
  metric: "Celsius",
  setLocation(location) {},
  setCoordinates(coordinates) {},
  setMetric(metric) {},
});

export default WeatherContext;
