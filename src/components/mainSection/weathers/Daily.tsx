import * as React from "react";
import classes from "./Daily.module.css";
import { Weather } from "../../../data/WeatherData";
import WeatherItem from "./WeatherItem";

type DailyProps = {
  dailyData: Weather[];
};

const Daily = ({ dailyData }: DailyProps) => {
  const displayCurrentData = (): JSX.Element[] => {
    const lines: JSX.Element[] = [];
    const dData = dailyData[0];
    for (const key in dData) {
      const value = dData[key as keyof typeof dData];
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

export default Daily;
