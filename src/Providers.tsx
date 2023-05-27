import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import App from "./app";
import WeatherProvider from "./context/WeatherProvider";

const Providers = () => {
  return (
    <ChakraProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </ChakraProvider>
  );
};

export default Providers;
