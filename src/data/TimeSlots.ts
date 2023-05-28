export const TIME_SLOTS = ["Current", "Hourly", "Daily"];

export const validateTimeSlot = (tSlot: string) => {
  return TIME_SLOTS.indexOf(tSlot) > -1;
};

export const isCurrentTimeSlot = (tSlot: string): boolean => {
  return tSlot === TIME_SLOTS[0];
};

export const isHourlyTimeSlot = (tSlot: string): boolean => {
  return tSlot === TIME_SLOTS[1];
};

export const isDailyTimeSlot = (tSlot: string): boolean => {
  return tSlot === TIME_SLOTS[2];
};

export const getCurrentTimeSlot = (): string => {
  return TIME_SLOTS[0];
};
