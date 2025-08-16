import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const MuiDatePicker = forwardRef(function MuiDatePicker({ selectedTask, onChange }, ref) {

  // Convert selectedTask to dayjs or use today as default
  const toDayjsValue = () => {
    if (selectedTask?.Year != null && selectedTask?.Month != null && selectedTask?.Day != null) {
      return dayjs()
        .set("year", selectedTask.Year)
        .set("month", selectedTask.Month) 
        .set("date", selectedTask.Day);
    }
    return dayjs();
  };

  const [value, setValue] = useState(toDayjsValue());

  // Update value if selectedTask changes
  useEffect(() => {
    setValue(toDayjsValue());
  }, [selectedTask?.Year, selectedTask?.Month, selectedTask?.Day]);

  // Expose picked date via ref
  useImperativeHandle(ref, () => ({
    getPickedDate: () => ({
      year: value.year(),
      month: value.month(),
      day: value.date(),
    }),
  }));

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange({
        year: newValue.year(),
        month: newValue.month(),
        day: newValue.date(),
      });
    }
  };

  return (
    <DatePicker
      ref={ref}
      label="Task date"
      value={value}
      onChange={handleChange}
    />
  );
});

export default MuiDatePicker;

