import * as React from "react";
import WeatherContext from "../context/WeatherContext";

const useClassName = (className: any, classes: any): string => {
  const { isDarkMode } = React.useContext(WeatherContext);

  return `${className} ${isDarkMode ? classes.dark : classes.light}`;
};

export default useClassName;
