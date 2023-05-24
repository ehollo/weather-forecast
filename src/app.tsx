import * as React from "react";
import classes from "./app.module.css";
import MainSection from "./components/mainSection/MainSection";
import SecondarySection from "./components/secondarySection/SecondarySection";
import Header from "./components/header/Header";

export const App = () => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.sections}>
        <MainSection />
        <SecondarySection />
      </div>
    </div>
  );
};
