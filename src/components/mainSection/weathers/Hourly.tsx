import * as React from "react";
import { Weather } from "../../../data/WeatherData";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import WeatherItem from "./WeatherItem";
import HeadingPanel from "./HeadingPanel";

type HourlyProps = {
  hourlyData: Weather[];
};

const Hourly = ({ hourlyData }: HourlyProps) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {hourlyData.map((data: Weather) => (
        <AccordionItem key={data.time}>
          <AccordionButton display="flex" justifyContent="space-around">
            <HeadingPanel data={data} />
          </AccordionButton>
          <AccordionPanel
            display="grid"
            gridTemplateColumns="auto auto"
            columnGap="2rem"
          >
            <WeatherItem label="Humidity" value={data.humidity} />
            <WeatherItem label="Clouds" value={data.clouds} />
            <WeatherItem label="Uvi" value={data.uvi} />
            <WeatherItem label="Wind" value={data.wind} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Hourly;
