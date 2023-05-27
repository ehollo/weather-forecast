import * as React from "react";
import classes from "./Daily.module.css";
import { Weather } from "../../../data/WeatherData";

type DailyProps = {
  dailyData: Weather[];
};

const Daily = ({ dailyData }: DailyProps) => {
  return <ul></ul>;
};

export default Daily;
