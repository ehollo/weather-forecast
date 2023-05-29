import * as React from "react";
import { Weather } from "../../../data/WeatherData";
import LabeledItem from "../../UI/LabeledItem";

type WeatherItemChartProps = {
  data: Weather;
};

const WeatherItemChart = ({ data }: WeatherItemChartProps) => {
  return (
    <>
      <LabeledItem label="Rain" value={data.rain} />
      <LabeledItem label="Snow" value={data.snow} />
      <LabeledItem label="Clouds" value={data.clouds} />
      <LabeledItem label="Humidity" value={data.humidity} />
      <LabeledItem label="Visibility" value={data.visibility} />
      <LabeledItem label="UV Index" value={data.uvi} />
      <LabeledItem label="Wind" value={data.wind} />
    </>
  );
};

export default WeatherItemChart;
