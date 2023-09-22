import times from "lodash.times";
import t from "timestamp-utils";

import { DAYS, MONTH } from "./constants";

const MONTHS_LENGTH = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const initMonth = (timestamp) => {
  const time = timestamp || new Date().getTime();
  const [year, month, dayNumber] = t.decompose(time);
  const firstMonthDay = getDateWithoutTime(t.addDays(time, -dayNumber + 1));
  const monthLength = MONTHS_LENGTH[month - 1] || (isLeapYear(year) ? 29 : 28);
  const lastMonthDay = t.addDays(firstMonthDay, monthLength - 1);
  const firstMonthDayNumber = t.getWeekDay(firstMonthDay);
  const firstDayToDisplay = t.addDays(firstMonthDay, -firstMonthDayNumber);
  return { firstMonthDay, lastMonthDay, firstDayToDisplay, month, year };
};

export const getDays = (firstDay, lastDay) => {
  const lastDayNumber = t.getWeekDay(lastDay);
  const nextMonthDaysCount = lastDayNumber === 6 ? 0 : 6 - lastDayNumber;
  const daysCount =
    (lastDay - firstDay) / DAY_IN_MILLISECONDS + nextMonthDaysCount + 1;
  return times(daysCount, (i) => t.addDays(firstDay, i));
};

export const getDateWithoutTime = (timestamp) => {
  const [, , , hours, minutes, seconds, milliseconds] = t.decompose(timestamp);
  return t.add(timestamp, {
    hours: -hours,
    minutes: -minutes,
    seconds: -seconds,
    milliseconds: -milliseconds,
  });
};

export const dateIsOut = (date, start, end) => date < start || date > end;

export const getDayName = (day, isShort) => {
  const dayName = DAYS[t.getWeekDay(day)];
  return isShort ? dayName.slice(0, 2) : dayName;
};

export const getDayLabel = (day) => {
  const [year, currentMonth, dayNumber] = t.decompose(day);
  const dayName = getDayName(day);
  return `${dayNumber}-${currentMonth}-${year}, ${dayName}`;
};

const getParsedDays = (day, month) => {
  const [_, currentMonth, dayNumber] = t.decompose(day);
  if (month === currentMonth) {
    const monthLabel = MONTH[month - 1].slice(0, 4);
    const dayName = getDayName(day, true);
    return { dayName, dayNumber, monthLabel, id: day };
  }
  return null;
};

export const getShortDays = (today, lastMonthDay, activeDay) => {
  const [year, month, dayNumber] = t.decompose(activeDay);

  if (today === lastMonthDay) {
    return [getParsedDays(today, month)];
  }
  if (activeDay === lastMonthDay) {
    return [getParsedDays(activeDay, month)];
  }

  let days = getDays(today, lastMonthDay).slice(0, 7);
  if (!days.includes(activeDay)) {
    days = getDays(activeDay, lastMonthDay).slice(0, 7);
  }
  return days.map((d) => getParsedDays(d, month)).filter((el) => el);
};
