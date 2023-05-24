import * as React from "react";
import classes from "./SecondarySection.module.css";
import Section from "../UI/Section";

const SecondarySection = () => {
  return (
    <Section>
      <div className={classes.container}>Secondary</div>
    </Section>
  );
};

export default SecondarySection;
