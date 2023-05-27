import * as React from "react";
import classes from "./Section.module.css";
import useClassName from "../../hooks/useClassName";

type SectionProps = {
  children: JSX.Element;
};

const Section = ({ children }: SectionProps) => {
  return (
    <section className={useClassName(classes.section, classes)}>
      {children}
    </section>
  );
};

export default Section;
