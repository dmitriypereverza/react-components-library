import React from "react";
import moment from "moment";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import { LocaleUtils } from "react-day-picker";

import "./index.scss";

import { DateMode } from "projectLibs/date";
import { useBoolean } from "libs/hooks";

const WEEKDAYS_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const localeUtils: LocaleUtils = {
  // @ts-ignore
  ...LocaleUtils,
  formatMonthTitle: (d: Date) => MONTHS[d.getMonth()] + " " + d.getFullYear(),
  formatWeekdayShort: (i: number) => WEEKDAYS_SHORT[i],
  getFirstDayOfWeek: () => 1,
  getMonths: () => MONTHS,
};

interface DatePickerModeInterface {
  className?: string;
  inputFormat: DateMode;
  outputTextFormat: DateMode;
  componentProps: Record<string, any>;
  Component: any;
}

export interface BaseDatePickerInterface {
  mode: DatePickerModeInterface;
  top: number | string;
  min?: string;
  max?: string;
  wrapperStyles?: any;
}

export const defaultProps = {
  min: new Date(0),
  max: moment()
    .add(100, "year")
    .toDate(),
};

export default function useDatePicker({
  mode,
  max,
  min,
}: Pick<BaseDatePickerInterface, "mode" | "min" | "max">) {
  const { inputFormat } = mode;

  const minDate = React.useMemo(() => (min ? moment(min, inputFormat) : null), [
    min,
  ]);
  const maxDate = React.useMemo(() => (max ? moment(max, inputFormat) : null), [
    max,
  ]);

  const [error, setError] = React.useState<string>(null);

  const [opened, open, close] = useBoolean(false);

  return {
    mode,
    timeFrames: {
      minDate: minDate && minDate.toDate(),
      maxDate: maxDate && maxDate.toDate(),
    },
    minDate,
    maxDate,
    opened,
    error,
    open,
    close,
    setError,
  };
}
