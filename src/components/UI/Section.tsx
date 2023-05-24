import * as React from "react";
import classes from "./Section.module.css";

type SectionProps = {
  children: JSX.Element;
};

const Section = ({ children }: SectionProps) => {
  return <section className={classes.section}>{children}</section>;
};

export default Section;
