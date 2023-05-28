import * as React from "react";
import classes from "./DailyTemperature.module.css";
import { Weather } from "../../../data/WeatherData";
import TemperatureItem from "./TemperatureItem";
import useClassName from "../../../hooks/useClassName";
import WeatherItem from "./WeatherItem";

type DailyTemperatureProps = {
  data: Weather;
};

const DailyTemperature = ({ data }: DailyTemperatureProps) => {
  return (
    <div className={`${useClassName(classes.dailyTemperature, classes)}`}>
      <div className={`${useClassName(classes.temperature, classes)}`}>
        Temperature:
      </div>
      <div className={classes.items}>
        <WeatherItem label="Low" value={data.temp_min} />
        <WeatherItem label="High" value={data.temp_max} />
        <TemperatureItem
          label1="Morning"
          value1={data.temp_morn}
          label2="Feels like"
          value2={data.feels_like_morn}
        />
        <TemperatureItem
          label1="Day"
          value1={data.temp_day}
          label2="Feels like"
          value2={data.feels_like_day}
        />
        <TemperatureItem
          label1="Evening"
          value1={data.temp_eve}
          label2="Feels like"
          value2={data.feels_like_eve}
        />
        <TemperatureItem
          label1="Night"
          value1={data.temp_night}
          label2="Feels like"
          value2={data.feels_like_night}
        />
      </div>
    </div>
  );
};

export default DailyTemperature;
