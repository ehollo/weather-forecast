import * as React from "react";
import classes from "./SliderInput.module.css";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import useClassName from "../../hooks/useClassName";
import WeatherContext from "../../context/WeatherContext";

type StyledInputProps = {
  id: string;
  label: string;
  defaultValue: number;
  onChange(value: number): void;
};

const SliderInput = ({
  id,
  label,
  defaultValue,
  onChange,
}: StyledInputProps) => {
  const handleChange = (value: number) => {
    onChange(value);
  };

  const { isDarkMode } = React.useContext(WeatherContext);
  const trackColor = isDarkMode ? "#008793" : "#95f9f9";
  const filledColor = isDarkMode ? "#00363b" : "#004d7a";

  return (
    <>
      {
        <label
          className={`${useClassName(classes.label, classes)}`}
          htmlFor={id}
        >
          {label}
        </label>
      }
      <Slider
        id={id}
        size="md"
        margin="0.25rem 0rem"
        defaultValue={defaultValue}
        onChangeEnd={handleChange}
      >
        <SliderTrack bg={trackColor}>
          <SliderFilledTrack bg={filledColor} />
        </SliderTrack>
        <SliderThumb boxSize={3} bg={filledColor} />
      </Slider>
    </>
  );
};

export default SliderInput;
