import * as React from "react";
import classes from "./TimeSlotChooser.module.css";
import TimeSlot from "./TimeSlot";

type TimeSlotChooserProps = {
  onClick(timeSlot: string): void;
};

export const TIME_SLOTS = ["Current", "Hourly", "Daily"];

const TimeSlotChooser = ({ onClick }: TimeSlotChooserProps) => {
  const [selectedItem, setSelecteditem] = React.useState(0);

  const handleClick = (index: number) => {
    setSelecteditem(index);
    onClick(TIME_SLOTS[index]);
  };

  return (
    <ul className={classes.list}>
      {TIME_SLOTS.map((timeSlot, id) => (
        <TimeSlot
          key={id}
          value={timeSlot}
          isSelected={selectedItem === id}
          onClick={() => handleClick(id)}
        />
      ))}
    </ul>
  );
};

export default TimeSlotChooser;
