import * as React from "react";
import classes from "./DailyTemperature.module.css";
import { Weather } from "../../../data/WeatherData";
import useClassName from "../../../hooks/useClassName";
import LabeledItem from "../../UI/LabeledItem";
import PairedItems from "../../UI/PairedItems";

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
        <LabeledItem label="Low" value={data.temp_min} />
        <LabeledItem label="High" value={data.temp_max} />
        <PairedItems
          label1="Morning"
          value1={data.temp_morn}
          label2="Feels like"
          value2={data.feels_like_morn}
        />
        <PairedItems
          label1="Day"
          value1={data.temp_day}
          label2="Feels like"
          value2={data.feels_like_day}
        />
        <PairedItems
          label1="Evening"
          value1={data.temp_eve}
          label2="Feels like"
          value2={data.feels_like_eve}
        />
        <PairedItems
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
