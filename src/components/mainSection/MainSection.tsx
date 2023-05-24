import * as React from "react";
import classes from "./MainSection.module.css";
import Section from "../UI/Section";
import TimeSlotChooser, { TIME_SLOTS } from "./timeSlotChooser/TimeSlotChooser";
import useFetchWeather from "../../hooks/use-fetch-weather";
import WeatherContext, { LocationCoords } from "../../context/WeatherContext";
import useLocation from "../../hooks/use-location";
import { WeatherData, nullWeatherData } from "../../data/WeatherData";
import { weatherDataParser } from "../../data/WeatherDataParser";

const MainSection = () => {
  const { coordinates } = React.useContext(WeatherContext);
  const [timeSlot, setTimeSlot] = React.useState("Current");
  const {
    isLoading,
    error,
    fetchWeatherWrapper: sendRequest,
  } = useFetchWeather();
  const { isLocationLoading, locationError, locationCallback } = useLocation();
  const [weatherData, setWeatherData] = React.useState(nullWeatherData);

  React.useEffect(() => {
    const place = { current: true };
    locationCallback(place);
  }, [locationCallback]);

  React.useEffect(() => {
    const handleData = (data: WeatherData) => {
      weatherDataParser(data);
      console.log(data.current.dt);
      console.log(data.current.temp);
      console.log(
        data.hourly[0].rain ? data.hourly[0].rain["1h"] : "no value of rain"
      );
      setWeatherData(data);
    };

    if (validateTimeSlot(timeSlot) && validateCoordinates(coordinates)) {
      sendRequest({ coordinates, isLocationLoading, handleData });
    }
  }, [coordinates, timeSlot, sendRequest]);

  const validateCoordinates = (coordinates: LocationCoords) => {
    return coordinates.lat != 0 && coordinates.lon != 0;
  };

  const validateTimeSlot = (tSlot: string) => {
    return TIME_SLOTS.indexOf(tSlot) > -1;
  };

  const handleClick = (timeSlot: string) => {
    setTimeSlot(timeSlot);
  };

  return (
    <Section>
      <div className={classes.container}>
        <TimeSlotChooser onClick={handleClick} />
        {`Temperature: ${weatherData.current.temp}`}
      </div>
    </Section>
  );
};

export default MainSection;
