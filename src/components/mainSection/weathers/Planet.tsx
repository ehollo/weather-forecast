import * as React from "react";
import classes from "./Planet.module.css";
import { Box } from "@chakra-ui/react";
import WeatherItem from "./WeatherItem";

type PlanetProps = {
  sunrise?: string;
  sunset?: string;
  moonrise?: string;
  moonset?: string;
};

const Planet = ({ sunrise, sunset, moonrise, moonset }: PlanetProps) => {
  const sunImg = (
    <img
      className={classes.sun}
      src={"../../../../public/assets/sun.png"}
      alt={"Sun icon for sun rise and sun set"}
    />
  );
  const moonImg = (
    <img
      className={classes.moon}
      src={"../../../../public/assets/crescent-moon.png"}
      alt={"Moon icon for moon rise and moon set"}
    />
  );

  return (
    <div className={classes.content}>
      {sunrise && sunset && (
        <div className={classes.planet}>
          {sunImg}
          <Box w="13rem">
            <WeatherItem label="Sun rise" value={sunrise} />
            <WeatherItem label="Sun set" value={sunset} />
          </Box>
        </div>
      )}
      {moonrise && moonset && (
        <div className={classes.planet}>
          {moonImg}
          <Box w="13rem">
            <WeatherItem label="Moon rise" value={moonrise} />
            <WeatherItem label="Moon set" value={moonset} />
          </Box>
        </div>
      )}
    </div>
  );
};

export default Planet;
