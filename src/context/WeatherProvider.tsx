import * as React from "react";
import WeatherContext, { Units, WeatherContextType } from "./WeatherContext";
import { getThemeSetting, getUnitsSetting } from "../data/StorageData";

const WeatherProvider = ({ children }: { children: JSX.Element }) => {
  const [units, setUnits] = React.useState(
    getUnitsSetting() || ("metric" as Units)
  );
  const [isDarkMode, setIsDarkMode] = React.useState(!!getThemeSetting());

  const weatherContext: WeatherContextType = {
    units,
    isDarkMode,
    setUnits,
    setIsDarkMode,
  };
  return (
    <WeatherContext.Provider value={weatherContext}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
