import * as React from "react";
import classes from "./MainSection.module.css";
import Section from "../UI/Section";
import TimeSlotChooser from "./timeSlotChooser/TimeSlotChooser";
import useFetchWeather from "../../hooks/use-fetch-weather";
import WeatherContext, { LocationCoords } from "../../context/WeatherContext";
import useLocation from "../../hooks/use-location";
import { Weather, WeatherData, nullWeatherData } from "../../data/WeatherData";
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
import { getStorageData, setStorageData } from "../../data/StorageData";

const MainSection = () => {
  const { coordinates, units } = React.useContext(WeatherContext);
  const [timeSlot, setTimeSlot] = React.useState(getCurrentTimeSlot());
  const {
    isLoading,
    error,
    fetchWeatherWrapper: sendRequest,
  } = useFetchWeather();
  const [isRequestToSend, setRequestToSend] = React.useState(true);
  const { isLocationLoading, locationError, locationCallback } = useLocation();
  const [weatherData, setWeatherData] = React.useState(nullWeatherData);

  React.useEffect(() => {
    setInterval(() => {
      setRequestToSend(true);
    }, 600000);
  }, []);

  React.useEffect(() => {
    const place = { current: true };
    locationCallback(place);
  }, [locationCallback]);

  React.useEffect(() => {
    const handleData = (data: WeatherData) => {
      setStorageData(data.daily, timeSlot);
      setWeatherData(data);
    };

    if (isRequestToSend && validateCoordinates(coordinates)) {
      const dailyData: Weather[] = getStorageData(timeSlot);
      if (dailyData.length > 0) {
        setWeatherData({ ...weatherData, daily: dailyData });
      } else {
        setRequestToSend(false);
        sendRequest({ coordinates, isLocationLoading, handleData });
      }
    }
  }, [coordinates, timeSlot, sendRequest]);

  const validateCoordinates = (coordinates: LocationCoords) => {
    return coordinates.lat != 0 && coordinates.lon != 0;
  };

  const handleClick = (timeSlot: string) => {
    validateTimeSlot(timeSlot) && setTimeSlot(timeSlot);
  };

  return (
    <Section>
      <div className={classes.container}>
        <TimeSlotChooser onClick={handleClick} />
        {isCurrentWeather(timeSlot) && (
          <Current currentData={weatherData.current}></Current>
        )}
        {isHourlyWeather(timeSlot) && (
          <Hourly hourlyData={weatherData.hourly}></Hourly>
        )}
        {isDailyWeather(timeSlot) && (
          <Daily dailyData={weatherData.daily}></Daily>
        )}
      </div>
    </Section>
  );
};

export default MainSection;
