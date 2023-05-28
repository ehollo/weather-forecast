import * as React from "react";
import classes from "./Logo.module.css";
import useClassName from "../../hooks/useClassName";

const Logo = () => {
  return (
    <div className={useClassName(classes.logo, classes)}>
      Weather
      <br />
      forecast
      <img
        className={classes.icon}
        src={"../../../public/assets/weather-forecast.png"}
        alt={"Weather forecast icon"}
      />
    </div>
  );
};

export default Logo;
