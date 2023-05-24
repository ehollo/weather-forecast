import * as React from "react";
import WeatherContext, {
  TempMetric,
  WeatherContextType,
} from "./WeatherContext";

const WeatherProvider = ({ children }: { children: JSX.Element }) => {
  const [location, setLocation] = React.useState({ city: "", country: "" });
  const [coordinates, setCoordinates] = React.useState({ lat: 0, lon: 0 });
  const [metric, setMetric] = React.useState("Celsius" as TempMetric);

  const weatherContext: WeatherContextType = {
    location,
    coordinates,
    metric,
    setLocation,
    setCoordinates,
    setMetric,
  };
  return (
    <WeatherContext.Provider value={weatherContext}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
