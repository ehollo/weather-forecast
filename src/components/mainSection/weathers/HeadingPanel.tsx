import * as React from "react";
import classes from "./HeadingPanel.module.css";
import useClassName from "../../../hooks/useClassName";
import { Box } from "@chakra-ui/react";

type HeadingPanelProps = {
  time: string;
  weatherIcon?: string;
  weatherDescription?: string;
  temp?: string;
  feelsLike?: string;
  isDaily?: boolean;
};

const HeadingPanel = ({
  time,
  weatherIcon,
  weatherDescription,
  temp,
  feelsLike,
  isDaily = false,
}: HeadingPanelProps) => {
  const dateOrTime = isDaily ? `Date: ${time}` : `Time: ${time} h`;
  return (
    <div className={useClassName(classes.heading, classes)}>
      <div className={useClassName(classes.time, classes)}>{dateOrTime}</div>
      {weatherIcon && (
        <div className={useClassName(classes.weather_icon, classes)}>
          <img src={weatherIcon} alt="Icon of the actual weather" />
        </div>
      )}
      {weatherDescription && (
        <div className={useClassName(classes.description, classes)}>
          {weatherDescription}
        </div>
      )}
      <Box>
        <div className={useClassName(classes.temperature, classes)}>{temp}</div>
        {feelsLike && (
          <div className={useClassName(classes.feel, classes)}>
            Feels like: {feelsLike}
          </div>
        )}
      </Box>
    </div>
  );
};

export default HeadingPanel;
