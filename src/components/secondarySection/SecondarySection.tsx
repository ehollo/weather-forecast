import * as React from "react";
import classes from "./SecondarySection.module.css";
import Section from "../UI/Section";
import { Cities } from "../../data/CityLocations";
import { WeatherData } from "../../data/WeatherData";
import useClassName from "../../hooks/useClassName";
import SliderInput from "../UI/SliderInput";
import CityWeather from "./CityWeather";

export type WeatherResponse = {
  isLoading: boolean;
  error: any;
  weatherData?: WeatherData;
};

const DEFAULT_TIMER = 10000;
const SecondarySection = () => {
  const [timer, setTimer] = React.useState(DEFAULT_TIMER);
  const [cityIndex, setCityIndex] = React.useState(0);

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
        <CityWeather cityIndex={cityIndex} />
      </div>
    </Section>
  );
};

export default SecondarySection;
