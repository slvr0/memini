import React, { useState, useEffect } from "react";
import { Slider, Box } from "@mui/material";

const minutesInDay = 24 * 60;
const stepMinutes = 15;

const valueToTime = (value: number) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

interface DiscreteDoubleTimeSliderProps {
  value: number[];
  onChange: (newValue: number[]) => void;
}

const DiscreteDoubleTimeSlider: React.FC<DiscreteDoubleTimeSliderProps> = ({
  value,
  onChange
}) => {
  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    let updatedRange: number[];
    if (activeThumb === 0) {
      if (newValue[0] >= value[1]) return; // block if crossing end
      updatedRange = [newValue[0], value[1]];
    } else {
      if (newValue[1] <= value[0]) return; // block if crossing start
      updatedRange = [value[0], newValue[1]];
    }

    onChange(updatedRange);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Slider
        value={value}
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
};

export default DiscreteDoubleTimeSlider;