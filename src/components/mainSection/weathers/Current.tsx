import * as React from "react";
import classes from "./Current.module.css";
import { Weather } from "../../../data/WeatherData";
import useClassName from "../../../hooks/useClassName";
import HeadingPanel from "./HeadingPanel";

type CurrentProps = {
  currentData: Weather;
};

const Current = ({ currentData }: CurrentProps) => {
  return <HeadingPanel data={currentData} />;
};

export default Current;
