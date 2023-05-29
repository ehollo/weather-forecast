import * as React from "react";
import classes from "./LabeledItem.module.css";
import useClassName from "../../hooks/useClassName";

type LabeledItemProps = {
  label: string;
  value?: string;
};

const LabeledItem = ({ label, value }: LabeledItemProps) => {
  return (
    <>
      {value && (
        <div className={`${useClassName(classes.item, classes)}`}>
          <span
            className={`${useClassName(classes.label, classes)}`}
          >{`${label}: `}</span>
          <span className={`${useClassName(classes.value, classes)}`}>
            {value}
          </span>
        </div>
      )}
    </>
  );
};

export default LabeledItem;
