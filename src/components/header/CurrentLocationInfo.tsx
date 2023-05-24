import * as React from "react";
import classes from "./CurrentLocationInfo.module.css";
import WeatherContext from "../../context/WeatherContext";

const CurrentLocationInfo = () => {
  const { location } = React.useContext(WeatherContext);
  const currentLocation =
    location.city && location.city.length > 0
      ? `${location.city}, ${location.country}`
      : "";
  return <div className={classes.info}>{currentLocation}</div>;
};

export default CurrentLocationInfo;
