import * as React from "react";
import classes from "./TemperatureItem.module.css";
import useClassName from "../../../hooks/useClassName";

type TemperatureItemProps = {
  label1: string;
  value1?: string;
  label2: string;
  value2?: string;
};

const TemperatureItem = ({
  label1,
  value1,
  label2,
  value2,
}: TemperatureItemProps) => {
  return (
    <>
      {value1 && value2 && (
        <div className={`${useClassName(classes.items, classes)}`}>
          <div className={`${useClassName(classes.anItem, classes)}`}>
            <span
              className={`${useClassName(classes.label, classes)}`}
            >{`${label1}: `}</span>
            <span className={`${useClassName(classes.value, classes)}`}>
              {value1}
            </span>
          </div>
          <div className={`${useClassName(classes.anItem, classes)}`}>
            <span
              className={`${useClassName(classes.label, classes)}`}
            >{`${label2}: `}</span>
            <span className={`${useClassName(classes.value, classes)}`}>
              {value2}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default TemperatureItem;
