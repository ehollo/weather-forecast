import * as React from "react";
import { App } from "./app";
import WeatherProvider from "./context/WeatherProvider";

const AppProvider = () => {
  return (
    <WeatherProvider>
      <App></App>
    </WeatherProvider>
  );
};

export default AppProvider;
