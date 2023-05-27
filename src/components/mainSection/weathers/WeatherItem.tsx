import * as React from "react";
import classes from "./WeatherItem.module.css";
import useClassName from "../../../hooks/useClassName";

type WeatherItemProps = {
  label: string;
  value?: string;
};

const WeatherItem = ({ label, value }: WeatherItemProps) => {
  return (
    <div className={`${useClassName(classes.item, classes)}`}>
      <span
        className={`${useClassName(classes.label, classes)}`}
      >{`${label}: `}</span>
      <span className={`${useClassName(classes.value, classes)}`}>
        {value ?? "-"}
      </span>
    </div>
  );
};

export default WeatherItem;
