import * as React from "react";
import classes from "./Current.module.css";
import { Weather } from "../../../data/WeatherData";
import HeadingPanel from "./HeadingPanel";
import WeatherItemChart from "./WeatherItemChart";
import Planet from "./Planet";

type CurrentProps = {
  currentData: Weather;
};

const Current = ({ currentData }: CurrentProps) => {
  return (
    <>
      <div className={classes.current}>
        <HeadingPanel
          time={currentData.time!}
          weatherIcon={currentData.weather_icon}
          weatherDescription={currentData.weather_description}
          temp={currentData.temp}
          feelsLike={currentData.feels_like}
        />
        <div className={classes.chart}>
          <WeatherItemChart data={currentData} />
        </div>
      </div>
      <Planet
        sunrise={currentData.sunrise}
        sunset={currentData.sunset}
        moonrise={currentData.moonrise}
        moonset={currentData.moonset}
      />
    </>
  );
};

export default Current;
