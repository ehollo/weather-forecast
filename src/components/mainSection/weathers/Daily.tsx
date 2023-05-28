import * as React from "react";
import classes from "./Daily.module.css";
import { Weather } from "../../../data/WeatherData";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import HeadingPanel from "./HeadingPanel";
import WeatherItemChart from "./WeatherItemChart";
import Planet from "./Planet";
import DailyTemperature from "./DailyTemperature";

type DailyProps = {
  dailyData: Weather[];
};

const Daily = ({ dailyData }: DailyProps) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {dailyData.map((data: Weather) => (
        <AccordionItem key={data.time}>
          <AccordionButton display="flex" justifyContent="space-around">
            <HeadingPanel
              time={data.time!}
              weatherIcon={data.weather_icon}
              weatherDescription={data.weather_description}
              temp={data.temp}
              feelsLike={data.feels_like}
              isDaily={true}
            />
          </AccordionButton>
          <AccordionPanel>
            <DailyTemperature data={data} />
            <div className={classes.weatherChart}>
              <WeatherItemChart data={data} />
            </div>
            <Planet
              sunrise={data.sunrise}
              sunset={data.sunset}
              moonrise={data.moonrise}
              moonset={data.moonset}
            />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Daily;
