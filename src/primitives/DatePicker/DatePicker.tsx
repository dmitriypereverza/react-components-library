import React from "react";
import {
  IDatePickerShortcut,
  DatePicker,
  TimePicker,
} from "@blueprintjs/datetime";
import moment, { Moment } from "moment";
import { isNil } from "ramda";

import ClickOutside from "primitives/ClickOutside/ClickOutside";
import Wrapper from "primitives/Wrapper";

import ContentPanel from "components/ContentPanel";

import useDatePicker, {
  BaseDatePickerInterface,
  defaultProps,
  localeUtils,
} from "./base";

import { DateMode, momentFromLocalString } from "projectLibs/date";
import { left, padding, position, right, top, zIndex } from "libs/styles";

const shortcuts: IDatePickerShortcut[] = [
  {
    date: moment().toDate(),
    includeTime: true,
    label: "Сегодня",
  },
  {
    date: moment()
      .add(1, "day")
      .toDate(),
    includeTime: true,
    label: "Завтра",
  },
  {
    date: moment()
      .add(1, "week")
      .toDate(),
    includeTime: true,
    label: "Через неделю",
  },
  {
    date: moment()
      .add(2, "week")
      .toDate(),
    includeTime: true,
    label: "Через 2 недели",
  },
  {
    date: moment()
      .add(1, "month")
      .toDate(),
    includeTime: true,
    label: "Через месяц",
  },
  {
    date: moment()
      .add(3, "month")
      .toDate(),
    includeTime: true,
    label: "Через 3 месяца",
  },
  {
    date: moment()
      .add(6, "month")
      .toDate(),
    includeTime: true,
    label: "Через 6 месяцев",
  },
  {
    date: moment()
      .add(1, "year")
      .toDate(),
    includeTime: true,
    label: "Через год",
  },
  {
    date: new Date(-100000000),
    includeTime: true,
    label: "",
  },
  {
    date: moment()
      .add(-1, "day")
      .toDate(),
    includeTime: true,
    label: "Вчера",
  },
  {
    date: moment()
      .add(-1, "week")
      .toDate(),
    includeTime: true,
    label: "Неделю назад",
  },
  {
    date: moment()
      .add(-1, "month")
      .toDate(),
    includeTime: true,
    label: "Месяц назад",
  },
  {
    date: moment()
      .add(-1, "year")
      .toDate(),
    includeTime: true,
    label: "Год назад",
  },
];

interface DatePickerInterface extends BaseDatePickerInterface {
  value: string;
  onRight?: boolean;
  children: (
    value: string,
    opened: boolean,
    error: string,
    open: () => void,
    close: () => void,
  ) => React.ReactNode;
  onChange: (value: string) => void;
}

export const DatePickerMode = {
  DATE: {
    className: "date-picker date-picker-date",
    inputFormat: DateMode.DATE,
    outputTextFormat: DateMode.DAY_MONTH_YEAR,
    Component: DatePicker,
    componentProps: {
      highlightCurrentDay: true,
      locale: "ru",
      localeUtils,
    },
  },
  DATE_TIME: {
    className: "date-picker date-picker-date",
    inputFormat: DateMode.DATE_TIME,
    outputTextFormat: DateMode.DAY_MONTH_YEAR_TIME,
    Component: DatePicker,
    componentProps: {
      highlightCurrentDay: true,
      locale: "ru",
      localeUtils,
      includeTime: true,
      timePrecision: "minute",
      timePickerProps: {
        showArrowButtons: true,
      },
    },
  },
  TIME: {
    className: "date-picker date-picker-time",
    inputFormat: DateMode.TIME,
    outputTextFormat: DateMode.TIME,
    Component: TimePicker,
    componentProps: {
      precision: "minute",
      showArrowButtons: true,
    },
  },
};

function DatePickerRangeComponent({
  onRight,
  mode,
  min,
  max,
  top: topValue,
  wrapperStyles,
  value,
  children,
  onChange,
}: DatePickerInterface) {
  const {
    mode: {
      outputTextFormat,
      inputFormat,
      Component,
      componentProps,
      className: pickerClassName,
    },
    minDate,
    maxDate,
    timeFrames,
    error,
    opened,
    open,
    close,
    setError,
  } = useDatePicker({ mode, min, max });

  const [currentValue, setCurrentValue] = React.useState<Moment>(null);

  React.useEffect(() => {
    if (!currentValue) return;

    if (minDate && currentValue.isBefore(minDate)) {
      setError("Выбранная дата меньше минимальной");
      return;
    }

    if (maxDate && currentValue.isAfter(maxDate)) {
      setError("Выбранная дата больше максимальной");
      return;
    }

    if (error) setError(null);
  }, [currentValue, minDate, maxDate]);

  React.useEffect(() => {
    setCurrentValue(value ? momentFromLocalString(value, inputFormat) : null);
  }, [value]);

  function onChangePicker(date: Date, isUserChange?: boolean) {
    if (!isNil(isUserChange) && !isUserChange) return;
    const newDate = moment(date);
    if (newDate.isValid()) {
      onChange(newDate.format(inputFormat));
      return;
    }
    onChange(null);
  }

  const result: any = {};

  if (currentValue) {
    result.value = error ? minDate.toDate() : currentValue.toDate();
  }

  return (
    <ClickOutside handleEnabled={opened} handleClickOut={close}>
      <Wrapper styles={[position("relative"), wrapperStyles]}>
        {children(
          currentValue ? currentValue.format(outputTextFormat) : value,
          opened,
          error,
          open,
          close,
        )}
        {opened && (
          <ContentPanel
            styles={[
              padding(0),
              position("absolute"),
              top(topValue),
              onRight ? right(0) : left(0),
              zIndex(1),
            ]}
          >
            <Component
              className={pickerClassName}
              shortcuts={shortcuts}
              {...result}
              {...timeFrames}
              {...componentProps}
              onChange={onChangePicker}
            />
          </ContentPanel>
        )}
      </Wrapper>
    </ClickOutside>
  );
}

DatePickerRangeComponent.defaultProps = defaultProps;

export default React.memo(DatePickerRangeComponent);
