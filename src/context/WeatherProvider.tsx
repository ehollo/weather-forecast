import * as React from "react";
import WeatherContext, { Units, WeatherContextType } from "./WeatherContext";

const WeatherProvider = ({ children }: { children: JSX.Element }) => {
  const [location, setLocation] = React.useState({ city: "", country: "" });
  const [coordinates, setCoordinates] = React.useState({ lat: 0, lon: 0 });
  const [units, setUnits] = React.useState("metric" as Units);

  const weatherContext: WeatherContextType = {
    location,
    coordinates,
    units,
    setLocation,
    setCoordinates,
    setUnits,
  };
  return (
    <WeatherContext.Provider value={weatherContext}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
