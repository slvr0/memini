import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Slider, Box } from "@mui/material";
import type {TimeSliderRef, DiscreteDoubleTimeSliderProps} from "./interfaces/mui-interfaces";

const minutesInDay = 24 * 60;
const stepMinutes = 15;

const valueToTime = (value : number) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const DiscreteDoubleTimeSlider = forwardRef<TimeSliderRef, DiscreteDoubleTimeSliderProps>(function DiscreteDoubleTimeSlider(
  { timeInterval , onChange }, // accept prop
  ref
) {
  const [timeRange, setTimeRange] = useState(timeInterval);

  useEffect(() => {
    if (timeInterval) setTimeRange(timeInterval);
  }, [timeInterval]);

  const handleChange = (event: Event, 
    newValue: number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    let updatedRange;
    if (activeThumb === 0) {
      if (newValue[0] >= timeRange[1]) return; // block if crossing end
      updatedRange = [newValue[0], timeRange[1]];
    } else {
      if (newValue[1] <= timeRange[0]) return; // block if crossing start
      updatedRange = [timeRange[0], newValue[1]];
    }

    setTimeRange(updatedRange);
    if (onChange) onChange(updatedRange); // notify parent
  };

  useImperativeHandle(ref, () => ({
    getValue: () : number[] =>  timeRange, // raw minutes
    getValueAsTime: () : string[] => timeRange.map(valueToTime), // formatted times
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Slider
        value={timeRange}
        onChange={handleChange}
        min={0}
        max={minutesInDay}
        step={stepMinutes}
        marks={[
          { value: 0, label: "00:00" },
          { value: 360, label: "06:00" },
          { value: 720, label: "12:00" },
          { value: 1080, label: "18:00" },
          { value: 1440, label: "24:00" }
        ]}
        valueLabelDisplay="auto"
        valueLabelFormat={valueToTime}
        disableSwap
      />
    </Box>
  );
});

export default DiscreteDoubleTimeSlider;
