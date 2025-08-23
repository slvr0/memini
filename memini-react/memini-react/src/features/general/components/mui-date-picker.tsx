import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { SimpleDate } from "../../planning/interfaces/planning-types";
import { Moment } from "moment";
import { MuiDatePickerProps, MuiDatePickerRef } from "../interfaces/general-types";

const MuiDatePicker = forwardRef<MuiDatePickerRef, MuiDatePickerProps>(function MuiDatePicker({ defaultDate, onChange }, ref) {
  //if a defaultDate is passed use it, otherwise use today
  const setDefaultValue = (defaultDate: SimpleDate | null | undefined) => {
    if (defaultDate) 
      return dayjs()
        .set("year", defaultDate.year)
        .set("month", defaultDate.month) 
        .set("date", defaultDate.day);
    return dayjs();
  }; 

  const [value, setValue] = useState<dayjs.Dayjs>(setDefaultValue(defaultDate));

  useImperativeHandle(ref, () => ({
    getPickedDate: (): SimpleDate => ({
      year: value.year(),
      month: value.month(),
      day: value.date(),
    }),
  }));

  const handleChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setValue(newValue);
      if (onChange) {
        onChange({
          year: newValue.year(),
          month: newValue.month(),
          day: newValue.date(),
        });
      }
    } 
  };

  return (
    <DatePicker
      label="Task date"
      value={value}
      onChange={handleChange}
    />
  );
});

export default MuiDatePicker;

