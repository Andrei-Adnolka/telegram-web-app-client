import { memo, useCallback, useState, useMemo, useEffect } from "react";
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

const CalendarIcon = () => (
  <svg
    width="28px"
    height="28px"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
      stroke="#3a3a3a"
      stroke-width="1.5"
    />
  </svg>
);

const CalendarUI = (props) => {
  const [state, setState] = useState(initMonth());
  const [isOpen, setIsOpen] = useState(false);
  const { onClickDate, activeDay, workingDays = null } = props;
  const { month, year, firstDayToDisplay, lastMonthDay, firstMonthDay } = state;

  const onIsOpenChange = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const changeMonth = ({ monthOffset = 0 }) => {
    const timestamp = t.add(firstMonthDay, { months: monthOffset });
    setState(initMonth(timestamp));
  };

  const onClickDay = useCallback(
    (day) => {
      onClickDate(day);
      setState(initMonth(day));
      setIsOpen(false);
      setTimeout(() => {
        document
          .querySelector(".short_calendar_day__active")
          ?.scrollIntoView?.({ behavior: "smooth", inline: "center" });
      }, 0);
    },
    [onClickDate, month]
  );

  const today = getDateWithoutTime(new Date().getTime());
  const [_, currentMonth] = t.decompose(today);

  const getClassNames = (day) => {
    const isWorking = Array.isArray(workingDays)
      ? workingDays.map(getDateWithoutTime).includes(day)
      : false;
    const isDayOutOfMonth = dateIsOut(day, firstMonthDay, lastMonthDay);

    return cn("rlc-day", `rlc-day-${day}`, {
      "rlc-day-out-of-month": isDayOutOfMonth,
      "rlc-day-active": activeDay === day,
      "rlc-day-disabled":
        today > day ||
        (month === currentMonth && isDayOutOfMonth) ||
        !isWorking,
    });
  };

  const shortDays = useMemo(() => {
    return getShortDays(today, lastMonthDay, activeDay, workingDays);
  }, [activeDay, workingDays]);

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
          <CalendarIcon />
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
