import * as React from "react";
import classes from "./CityWeather.module.css";
import { Cities, CityLocations } from "../../data/CityLocations";
import useCityWeather from "../../hooks/useCityWeather";
import Current from "../mainSection/weathers/Current";
import { WeatherResponse } from "./SecondarySection";
import ErrorMessage from "../UI/ErrorMessage";
import Loader from "../UI/Loader";

type CityWeatherProps = {
  cityIndex: number;
};
const CityWeather = ({ cityIndex }: CityWeatherProps) => {
  const response: WeatherResponse[] = Cities.map((city, index) =>
    useCityWeather(CityLocations.get(Cities[index])!)
  );

  return (
    <>
      <div className={classes.city}>{Cities[cityIndex]}</div>
      <div>
        {response[cityIndex].isLoading ? (
          <Loader />
        ) : response[cityIndex].error ? (
          <ErrorMessage error={response[cityIndex].error.message} />
        ) : (
          <>
            {response[cityIndex].weatherData && (
              <Current
                currentData={response[cityIndex].weatherData!.current}
              ></Current>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CityWeather;
