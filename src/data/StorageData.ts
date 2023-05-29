import { Units } from "../context/WeatherContext";
import { isDailyTimeSlot } from "./TimeSlots";
import { Weather } from "./WeatherData";

const WEATHER_STORAGE_KEY = "DailyWeatherData";
const UNITS_SETTING_KEY = "UnitsSettingKey";
const THEME_SETTING_KEY = "ThemeSettingKey";

export const getWeatherStorageData = (timeSlot: string): Weather[] => {
  if (isDailyTimeSlot(timeSlot)) {
    const storedItem = localStorage.getItem(WEATHER_STORAGE_KEY);
    if (storedItem) {
      const storedData: Weather[] = (JSON.parse(storedItem) as Weather[]) || [];
      const actualDate = new Date().getDate();
      const storedDateStr = storedData.length > 0 ? storedData[0].time : "";
      const storedDate = Number(
        storedDateStr?.slice(storedDateStr.indexOf(".") + 1)
      );
      if (actualDate === storedDate) {
        return storedData;
      }
    }
  }
  return [];
};

export const setWeatherStorageData = (data: Weather[]) => {
  localStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(data));
};

export const getUnitsSetting = (): Units | undefined => {
  const storedItem = localStorage.getItem(UNITS_SETTING_KEY);
  if (storedItem) {
    return JSON.parse(storedItem) as Units;
  }
};

export const getThemeSetting = (): boolean | undefined => {
  const storedItem = localStorage.getItem(THEME_SETTING_KEY);
  if (storedItem) {
    return JSON.parse(storedItem) as boolean;
  }
};

export const setUnitsSetting = (units: Units) => {
  localStorage.setItem(UNITS_SETTING_KEY, JSON.stringify(units));
};

export const setThemeSetting = (theme: boolean) => {
  localStorage.setItem(THEME_SETTING_KEY, JSON.stringify(theme));
};
