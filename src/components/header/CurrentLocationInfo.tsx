import * as React from "react";
import classes from "./CurrentLocationInfo.module.css";
import useLocation from "../../hooks/useLocation";
import useClassName from "../../hooks/useClassName";

const CurrentLocationInfo = () => {
  const { location } = useLocation();
  const currentLocation = location?.city
    ? `${location.city}, ${location.country}`
    : "";
  return (
    <div className={useClassName(classes.info, classes)}>{currentLocation}</div>
  );
};

export default CurrentLocationInfo;
