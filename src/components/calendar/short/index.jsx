import { memo } from "react";
import cn from "classnames";

import "./styles.scss";

const ShowDaysUI = ({
  id,
  onClickDay,
  dayName,
  dayNumber,
  monthLabel,
  activeDay,
}) => {
  const onClick = () => {
    onClickDay(id);
  };

  return (
    <div
      onClick={onClick}
      className={cn("short_calendar_day", {
        short_calendar_day__active: id === activeDay,
      })}
    >
      <div className="day">{`${dayNumber} ${dayName}`}</div>
      <div className="month">{monthLabel}</div>
    </div>
  );
};
export default memo(ShowDaysUI);
