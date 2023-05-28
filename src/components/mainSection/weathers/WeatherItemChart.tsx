import * as React from "react";
import WeatherItem from "./WeatherItem";
import { Weather } from "../../../data/WeatherData";

type WeatherItemChartProps = {
  data: Weather;
};

const WeatherItemChart = ({ data }: WeatherItemChartProps) => {
  return (
    <>
      <WeatherItem label="Rain" value={data.rain} />
      <WeatherItem label="Snow" value={data.snow} />
      <WeatherItem label="Clouds" value={data.clouds} />
      <WeatherItem label="Humidity" value={data.humidity} />
      <WeatherItem label="Visibility" value={data.visibility} />
      <WeatherItem label="UV Index" value={data.uvi} />
      <WeatherItem label="Wind" value={data.wind} />
    </>
  );
};

export default WeatherItemChart;
