import { memo, useCallback, useState, useMemo } from "react";
import t from "timestamp-utils";
import cn from "classnames";

import {
  initMonth,
  getDays,
  dateIsOut,
  getDateWithoutTime,
  getShortDays,
} from "./utils";
import { DAYS, TIMEZONE, MONTH } from "./constants";

import ShowDaysUI from "./short";
import Navigation from "./Navigation";

import "./styles.scss";

t.setTimezone(TIMEZONE);

const CalendarUI = (props) => {
  const [state, setState] = useState(initMonth());
  const [isOpen, setIsOpen] = useState(false);
  const { onClickDate, activeDay, markedDays = null } = props;
  const { month, year, firstDayToDisplay, lastMonthDay, firstMonthDay } = state;

  const onIsOpenChange = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClickDay = useCallback(
    (day) => {
      onClickDate(day);
      setIsOpen(false);
    },
    [onClickDate]
  );

  const changeMonth = ({ monthOffset = 0 }) => {
    const timestamp = t.add(firstMonthDay, { months: monthOffset });
    setState(initMonth(timestamp));
  };
  const today = getDateWithoutTime(new Date().getTime());

  const getClassNames = (day) => {
    // show worker days
    const isMarked = Array.isArray(markedDays)
      ? markedDays.map(getDateWithoutTime).includes(day)
      : false;

    return cn("rlc-day", `rlc-day-${day}`, {
      "rlc-day-out-of-month": dateIsOut(day, firstMonthDay, lastMonthDay),
      "rlc-day-marked": isMarked,
      "rlc-day-active": activeDay === day,
      "rlc-day-disabled": today > day,
    });
  };
  const [_, currentMonth] = t.decompose(today);

  const shortDays = useMemo(() => {
    return getShortDays(today, lastMonthDay, month, activeDay);
  }, [activeDay]);

  return (
    <div className="calendar_wrapper">
      <div className="title">Дата и время</div>
      <div className="short_calendar">
        <div
          className={cn("short_calendar__button", {
            ["short_calendar__button__active"]: isOpen,
          })}
          onClick={onIsOpenChange}
        >
          Open
        </div>
        {shortDays.map((d) => {
          return (
            <ShowDaysUI
              {...d}
              key={d.id}
              onClickDay={onClickDay}
              activeDay={activeDay}
            />
          );
        })}
      </div>
      <div className={cn("rlc-calendar", { "rlc-calendar--open": isOpen })}>
        <Navigation
          monthLabels={MONTH}
          month={month}
          year={year}
          isDisablePrevButton={currentMonth >= month}
          onChange={changeMonth}
        />
        <div className="rlc-days-label">
          {DAYS.map((label) => (
            <div className="rlc-day-label" key={label.toLowerCase()}>
              {label.slice(0, 2)}
            </div>
          ))}
        </div>
        <div className="rlc-days">
          {getDays(firstDayToDisplay, lastMonthDay).map((day) => (
            <div
              className={getClassNames(day)}
              key={day}
              onClick={() => {
                onClickDay(day);
              }}
            >
              {parseInt(t.getDay(day), 10)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(CalendarUI);
