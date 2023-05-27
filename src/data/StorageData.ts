import { isDailyWeather } from "./TimeSlots";
import { Weather } from "./WeatherData";

const LOCAL_STORAGE_KEY = "DailyWeatherData";

export const getStorageData = (timeSlot: string): Weather[] => {
  if (isDailyWeather(timeSlot)) {
    const storedItem = localStorage.getItem(LOCAL_STORAGE_KEY);
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

export const setStorageData = (data: Weather[], timeSlot: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};
