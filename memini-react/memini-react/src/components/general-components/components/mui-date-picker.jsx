import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { useSelector } from 'react-redux';

const MuiDatePicker = forwardRef(function MuiDatePicker(providedTask, ref)  {
  const calendarDateState = useSelector((state) => state.calendarDate);

  const toDayjsValue = () => {
    return providedTask?.startDate
      ? dayjs(providedTask.startDate)
      : dayjs()
          .set('year', calendarDateState.selectedDate.year)
          .set('month', calendarDateState.selectedDate.month) // 0-based!
          .set('date', calendarDateState.selectedDate.day);
  };

  const [value, setValue] = useState(toDayjsValue());

  // Sync when Redux state changes
  useEffect(() => {
    setValue(toDayjsValue());
  }, [calendarDateState.selectedDate, providedTask?.startDate]);

  useImperativeHandle(ref, () => ({
  getPickedDate: () => ({
    year: value.year(),
    month: value.month(), // 0-based, add +1 if you want 1-based
    day: value.date()
  })
}));

  return (
    <DatePicker
      ref={ref}
      label="Task date"
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
});

export default MuiDatePicker;
