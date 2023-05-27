import * as React from "react";
import classes from "./Header.module.css";
import CurrentLocationInfo from "./CurrentLocationInfo";
import { Box, Select } from "@chakra-ui/react";
import WeatherContext from "../../context/WeatherContext";
import useClassName from "../../hooks/useClassName";

const Header = () => {
  const { isDarkMode, setIsDarkMode } = React.useContext(WeatherContext);

  const handleColorModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsDarkMode(event.currentTarget.value === "dark");
  };

  const optionStyle = { backgroundColor: isDarkMode ? "#008793" : "#95f9f9" };
  return (
    <div className={useClassName(classes.header, classes)}>
      <div className={useClassName(classes.logo, classes)}>Logo</div>
      <CurrentLocationInfo />
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
          >
            <option style={optionStyle} selected>
              Metric (°C)
            </option>
            <option style={optionStyle}>Imperial (°F)</option>
          </Select>
        </Box>
      </div>
    </div>
  );
};

export default Header;
