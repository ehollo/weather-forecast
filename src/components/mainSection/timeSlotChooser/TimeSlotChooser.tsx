import * as React from "react";
import classes from "./TimeSlotChooser.module.css";
import TimeSlotItem from "./TimeSlotItem";
import { TIME_SLOTS } from "../../../data/TimeSlots";

type TimeSlotChooserProps = {
  onClick(timeSlot: string): void;
};

const TimeSlotChooser = ({ onClick }: TimeSlotChooserProps) => {
  const [selectedItem, setSelectedItem] = React.useState(0);

  const handleClick = (index: number) => {
    setSelectedItem(index);
    onClick(TIME_SLOTS[index]);
  };

  return (
    <ul className={classes.list}>
      {TIME_SLOTS.map((timeSlot, id) => (
        <TimeSlotItem
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
