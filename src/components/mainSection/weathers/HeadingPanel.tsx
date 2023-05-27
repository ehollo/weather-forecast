import * as React from "react";
import classes from "./HeadingPanel.module.css";
import useClassName from "../../../hooks/useClassName";
import { Box } from "@chakra-ui/react";
import { Weather } from "../../../data/WeatherData";

type HeadingPanelProps = {
  data: Weather;
};

const HeadingPanel = ({ data }: HeadingPanelProps) => {
  return (
    <div className={useClassName(classes.heading, classes)}>
      <div className={useClassName(classes.time, classes)}>
        Time: {data.time} h
      </div>
      {data.weather_icon && (
        <div className={useClassName(classes.weather_icon, classes)}>
          <img src={data.weather_icon} alt="Icon of the actual weather" />
        </div>
      )}
      {data.weather_main && (
        <div className={useClassName(classes.weather_main, classes)}>
          {data.weather_main}
        </div>
      )}
      <Box>
        <div className={useClassName(classes.temperature, classes)}>
          {data.temp}
        </div>
        {data.feels_like && (
          <div className={useClassName(classes.feel, classes)}>
            Feels like: {data.feels_like}
          </div>
        )}
      </Box>
    </div>
  );
};

export default HeadingPanel;
