import { Box, Select } from "@chakra-ui/react";
import classes from "./Settings.module.css";
import * as React from "react";
import useClassName from "../../hooks/useClassName";
import WeatherContext, { Units } from "../../context/WeatherContext";

const Settings = () => {
  const { isDarkMode, units, setIsDarkMode, setUnits } =
    React.useContext(WeatherContext);

  const handleColorModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsDarkMode(event.currentTarget.value === "dark");
  };

  const handleUnitsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUnits(event.currentTarget.value as Units);
  };

  const optionStyle = {
    backgroundColor: isDarkMode ? "#008793" : "#95f9f9",
  };

  return (
    <div className={useClassName(classes.settings, classes)}>
      <Box w="140px" margin="1rem">
        <Select
          bg={isDarkMode ? "#008793" : "#95f9f9"}
          borderColor={isDarkMode ? "#004d7a" : "#00363b"}
          color={isDarkMode ? "beige" : "black"}
          variant="outline"
          onChange={handleColorModeChange}
        >
          <option value="dark" style={optionStyle} selected={isDarkMode}>
            Dark theme
          </option>
          <option value="light" style={optionStyle} selected={!isDarkMode}>
            Light theme
          </option>
        </Select>
      </Box>
      <Box w="140px" margin="1rem">
        <Select
          bg={isDarkMode ? "#008793" : "#95f9f9"}
          borderColor={isDarkMode ? "#004d7a" : "#00363b"}
          color={isDarkMode ? "beige" : "black"}
          variant="outline"
          onChange={handleUnitsChange}
        >
          <option
            value="metric"
            style={optionStyle}
            selected={units === "metric"}
          >
            Metric (°C)
          </option>
          <option
            value="imperial"
            style={optionStyle}
            selected={units === "imperial"}
          >
            Imperial (°F)
          </option>
        </Select>
      </Box>
    </div>
  );
};

export default Settings;
