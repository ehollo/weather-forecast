export const TIME_SLOTS = ["Current", "Hourly", "Daily"];

export const validateTimeSlot = (tSlot: string) => {
  return TIME_SLOTS.indexOf(tSlot) > -1;
};

export const isCurrentWeather = (tSlot: string): boolean => {
  return tSlot === TIME_SLOTS[0];
};

export const isHourlyWeather = (tSlot: string): boolean => {
  return tSlot === TIME_SLOTS[1];
};

export const isDailyWeather = (tSlot: string): boolean => {
  return tSlot === TIME_SLOTS[2];
};

export const getCurrentTimeSlot = (): string => {
  return TIME_SLOTS[0];
};
