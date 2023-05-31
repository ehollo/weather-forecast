import * as React from "react";
import classes from "./MainSection.module.css";
import Section from "../UI/Section";
import TimeSlotChooser from "./timeSlotChooser/TimeSlotChooser";
import useWeather from "../../hooks/useWeather";
import {
  getCurrentTimeSlot,
  isCurrentTimeSlot,
  isDailyTimeSlot,
  isHourlyTimeSlot,
  validateTimeSlot,
} from "../../data/TimeSlots";
import Current from "./weathers/Current";
import Hourly from "./weathers/Hourly";
import Daily from "./weathers/Daily";
import Loader from "../UI/Loader";
import ErrorMessage from "../UI/ErrorMessage";

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
          <Loader />
        ) : error ? (
          <ErrorMessage error={error.message} />
        ) : (
          <>
            {weatherData && isCurrentTimeSlot(timeSlot) && (
              <Current currentData={weatherData.current}></Current>
            )}
            {weatherData && isHourlyTimeSlot(timeSlot) && (
              <Hourly hourlyData={weatherData.hourly}></Hourly>
            )}
            {weatherData && isDailyTimeSlot(timeSlot) && (
              <Daily dailyData={weatherData.daily}></Daily>
            )}
          </>
        )}
      </div>
    </Section>
  );
};

export default MainSection;
