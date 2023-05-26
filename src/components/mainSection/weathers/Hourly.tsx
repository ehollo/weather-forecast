import * as React from "react";
import classes from "./Hourly.module.css";
import { Weather } from "../../../data/WeatherData";

type HourlyProps = {
  hourlyData: Weather[];
};

const Hourly = ({ hourlyData }: HourlyProps) => {
  return <div></div>;
};

export default Hourly;
