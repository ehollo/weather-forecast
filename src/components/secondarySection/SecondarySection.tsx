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
import StyledInput from "../UI/StyledInput";

type Response = {
  isLoading: boolean;
  error: any;
  weatherData?: WeatherData;
};

const SecondarySection = () => {
  const [timer, setTimer] = React.useState(10000);
  const [cityIndex, setCityIndex] = React.useState(0);
  const response: Response[] = Cities.map((city, index) =>
    useCityWeather(CityLocations.get(Cities[index])!)
  );

  React.useEffect(() => {
    setInterval(() => {
      setCityIndex((prevIndex) => (prevIndex + 1) % 6);
    }, timer);
  }, [timer]);

  return (
    <Section>
      <div className={`${useClassName(classes.container, classes)}`}>
        {Cities[cityIndex]}
        <div className={classes.input}>
          {}
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
        <StyledInput
          placeHolder={"Add time interval in seconds for cycle city weather"}
          onChange={(value) => setTimer(value * 1000)}
        />
      </div>
    </Section>
  );
};

export default SecondarySection;
