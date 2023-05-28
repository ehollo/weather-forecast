import * as React from "react";
import { Weather } from "../../../data/WeatherData";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import HeadingPanel from "./HeadingPanel";
import WeatherItemChart from "./WeatherItemChart";

type HourlyProps = {
  hourlyData: Weather[];
};

const Hourly = ({ hourlyData }: HourlyProps) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {hourlyData.map((data: Weather) => (
        <AccordionItem key={data.time}>
          <AccordionButton display="flex" justifyContent="space-around">
            <HeadingPanel
              time={data.time!}
              weatherIcon={data.weather_icon}
              weatherDescription={data.weather_description}
              temp={data.temp}
              feelsLike={data.feels_like}
            />
          </AccordionButton>
          <AccordionPanel
            display="grid"
            gridTemplateColumns="1fr 1fr"
            columnGap="2rem"
            padding="1rem 0.25rem"
          >
            <WeatherItemChart data={data} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Hourly;
