import * as React from "react";
import classes from "./MainSection.module.css";
import Section from "../UI/Section";
import TimeSlotChooser from "./timeSlotChooser/TimeSlotChooser";
import useWeather from "../../hooks/useWeather";
import {
  getCurrentTimeSlot,
  isCurrentWeather,
  isDailyWeather,
  isHourlyWeather,
  validateTimeSlot,
} from "../../data/TimeSlots";
import Current from "./weathers/Current";
import Hourly from "./weathers/Hourly";
import Daily from "./weathers/Daily";
import { Skeleton, Stack } from "@chakra-ui/react";

const MainSection = () => {
  const { isLoading, timeSlot, error, weatherData, setTimeSlot } = useWeather(
    getCurrentTimeSlot()
  );

  const handleClick = (timeSlot: string) => {
    validateTimeSlot(timeSlot) && setTimeSlot(timeSlot);
  };

  return (
    <Section>
      <div className={classes.container}>
        <TimeSlotChooser onClick={handleClick} />
        {isLoading ? (
          <Stack>
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
          </Stack>
        ) : (
          <>
            {weatherData && isCurrentWeather(timeSlot) && (
              <Current currentData={weatherData.current}></Current>
            )}
            {weatherData && isHourlyWeather(timeSlot) && (
              <Hourly hourlyData={weatherData.hourly}></Hourly>
            )}
            {weatherData && isDailyWeather(timeSlot) && (
              <Daily dailyData={weatherData.daily}></Daily>
            )}
          </>
        )}
      </div>
    </Section>
  );
};

export default MainSection;
