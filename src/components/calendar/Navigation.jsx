import { memo } from "react";
import cn from "classnames";

const NavigationUI = ({
  onChange,
  monthLabels,
  month,
  year,
  isDisablePrevButton,
}) => {
  const prevMonth = () => onChange({ monthOffset: -1 });
  const nextMonth = () => onChange({ monthOffset: 1 });

  return (
    <div className="rlc-month-and-year-wrapper">
      <div className="rlc-navigation-button-wrapper">
        <div
          className={cn("rlc-navigation-button", {
            ["rlc-navigation-button-disabled"]: isDisablePrevButton,
          })}
          onClick={prevMonth}
        >
          {"<"}
        </div>
      </div>
      <div className="rlc-month-and-year">
        {monthLabels[month - 1]} <span>{year}</span>
      </div>
      <div className="rlc-navigation-button-wrapper">
        <div className="rlc-navigation-button" onClick={nextMonth}>
          {">"}
        </div>
      </div>
    </div>
  );
};

export default memo(NavigationUI);
