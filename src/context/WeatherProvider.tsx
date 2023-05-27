import * as React from "react";
import WeatherContext, { Units, WeatherContextType } from "./WeatherContext";

const WeatherProvider = ({ children }: { children: JSX.Element }) => {
  const [units, setUnits] = React.useState("metric" as Units);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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
