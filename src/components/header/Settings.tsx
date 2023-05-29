import { Box, Select } from "@chakra-ui/react";
import classes from "./Settings.module.css";
import * as React from "react";
import useClassName from "../../hooks/useClassName";
import WeatherContext, { Units } from "../../context/WeatherContext";
import {
  getThemeSetting,
  getUnitsSetting,
  setThemeSetting,
  setUnitsSetting,
} from "../../data/StorageData";

const Settings = () => {
  const { isDarkMode, units, setIsDarkMode, setUnits } =
    React.useContext(WeatherContext);

  const handleColorModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const isDarkMode = event.currentTarget.value === "dark";
    setIsDarkMode(isDarkMode);
    setThemeSetting(isDarkMode);
  };

  const handleUnitsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUnits(event.currentTarget.value as Units);
    setUnitsSetting(event.currentTarget.value as Units);
  };

  const optionStyle = {
    backgroundColor: isDarkMode ? "#008793" : "#95f9f9",
  };
  const theme = getThemeSetting()! || isDarkMode;
  const theUnits = getUnitsSetting() || units;

  return (
    <div className={useClassName(classes.settings, classes)}>
      <Box w="140px" margin="1rem">
        <Select
          bg={theme ? "#008793" : "#95f9f9"}
          borderColor={theme ? "#004d7a" : "#00363b"}
          color={theme ? "beige" : "black"}
          variant="outline"
          onChange={handleColorModeChange}
        >
          <option value="dark" style={optionStyle} selected={theme}>
            Dark theme
          </option>
          <option value="light" style={optionStyle} selected={!theme}>
            Light theme
          </option>
        </Select>
      </Box>
      <Box w="140px" margin="1rem">
        <Select
          bg={theme ? "#008793" : "#95f9f9"}
          borderColor={theme ? "#004d7a" : "#00363b"}
          color={theme ? "beige" : "black"}
          variant="outline"
          onChange={handleUnitsChange}
        >
          <option
            value="metric"
            style={optionStyle}
            selected={theUnits === "metric"}
          >
            Metric (°C)
          </option>
          <option
            value="imperial"
            style={optionStyle}
            selected={theUnits === "imperial"}
          >
            Imperial (°F)
          </option>
        </Select>
      </Box>
    </div>
  );
};

export default Settings;
