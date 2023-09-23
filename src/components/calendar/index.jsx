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
