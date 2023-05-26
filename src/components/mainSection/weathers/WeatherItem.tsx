import * as React from "react";
import classes from "./WeatherItem.module.css";

type WeatherItemProps = {
  label: string;
  value: string;
};

const WeatherItem = ({ label, value }: WeatherItemProps) => {
  return (
    <li className={`${classes.item}`}>
      <div>
        <span className={`${classes.label}`}>{`${label}: `}</span>
        <span className={`${classes.value}`}>{value}</span>
      </div>
    </li>
  );
};

export default WeatherItem;
