import * as React from "react";
import classes from "./Header.module.css";
import CurrentLocationInfo from "./CurrentLocationInfo";
import useClassName from "../../hooks/useClassName";
import Settings from "./Settings";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className={useClassName(classes.header, classes)}>
      <Logo />
      <CurrentLocationInfo />
      <Settings />
    </div>
  );
};

export default Header;
