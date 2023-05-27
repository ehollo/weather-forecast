import * as React from "react";

export type Units = "metric" | "imperial";

export type WeatherContextType = {
  units: Units;
  isDarkMode: boolean;
  setUnits(units: Units): void;
  setIsDarkMode(isDarkMode: boolean): void;
};

const WeatherContext = React.createContext<WeatherContextType>({
  units: "metric",
  isDarkMode: false,
  setUnits(units) {},
  setIsDarkMode(isDarkMode) {},
});

export default WeatherContext;
