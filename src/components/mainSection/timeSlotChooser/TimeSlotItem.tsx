import * as React from "react";
import classes from "./TimeSlotItem.module.css";
import useClassName from "../../../hooks/useClassName";

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
    <li
      className={`${useClassName(classes.item, classes)} ${selectedClass}`}
      onClick={handleClick}
    >
      {value}
    </li>
  );
};

export default TimeSlotItem;
