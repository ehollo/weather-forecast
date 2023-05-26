import * as React from "react";
import classes from "./Current.module.css";
import { Weather } from "../../../data/WeatherData";
import WeatherItem from "./WeatherItem";

type CurrentProps = {
  currentData: Weather;
};

const Current = ({ currentData }: CurrentProps) => {
  const displayCurrentData = (): JSX.Element[] => {
    const lines: JSX.Element[] = [];
    for (const key in currentData) {
      const value = currentData[key as keyof typeof currentData];
      if (value) {
        if (key === "weather_icon") {
          lines.push(
            <li key={key} className={classes[key]}>
              <img src={value} alt="Icon of the actual weather" />
            </li>
          );
        } else {
          lines.push(<WeatherItem key={key} label={key} value={value} />);
        }
      }
    }
    return lines;
  };
  return <ul>{displayCurrentData()}</ul>;
};

export default Current;
