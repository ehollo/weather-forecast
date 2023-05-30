import * as React from "react";
import classes from "./SecondarySection.module.css";
import Section from "../UI/Section";
import { Cities, CityLocations } from "../../data/CityLocations";
import useCityWeather from "../../hooks/useCityWeather";
import { WeatherData } from "../../data/WeatherData";
import ErrorMessage from "../mainSection/ErrorMessage";
import Loader from "../mainSection/Loader";
import Current from "../mainSection/weathers/Current";
import useClassName from "../../hooks/useClassName";
import SliderInput from "../UI/SliderInput";

type Response = {
  isLoading: boolean;
  error: any;
  weatherData?: WeatherData;
};

const DEFAULT_TIMER = 10000;
const SecondarySection = () => {
  const [timer, setTimer] = React.useState(DEFAULT_TIMER);
  const [cityIndex, setCityIndex] = React.useState(0);
  const response: Response[] = Cities.map((city, index) =>
    useCityWeather(CityLocations.get(Cities[index])!)
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prevIndex) => (prevIndex + 1) % 6);
    }, timer);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Section>
      <div className={`${useClassName(classes.container, classes)}`}>
        <SliderInput
          id="CycleInterval"
          label="Set time interval for cycling city weather:"
          defaultValue={DEFAULT_TIMER / 2000}
          onChange={(value) => setTimer(value * 2000)}
        />
        <div className={classes.city}>{Cities[cityIndex]}</div>
        <div className={classes.input}>
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
      </div>
    </Section>
  );
};

export default SecondarySection;
