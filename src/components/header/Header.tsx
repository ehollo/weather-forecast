import * as React from "react";
import classes from "./Header.module.css";
import CurrentLocationInfo from "./CurrentLocationInfo";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>Logo</div>
      <CurrentLocationInfo />
      <div className={classes.colorMode}>Color</div>
      <div className={classes.metric}>Metric</div>
    </div>
  );
};

export default Header;
