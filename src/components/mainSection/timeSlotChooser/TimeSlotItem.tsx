import * as React from "react";
import classes from "./TimeSlotItem.module.css";

type TimeSlotProps = {
  value: string;
  isSelected: boolean;
  onClick(): void;
};

const TimeSlotItem = ({ value, isSelected, onClick }: TimeSlotProps) => {
  const handleClick = () => {
    onClick();
  };

  const selectedClass = isSelected ? classes.selected : null;
  return (
    <li className={`${classes.item} ${selectedClass}`} onClick={handleClick}>
      {value}
    </li>
  );
};

export default TimeSlotItem;
