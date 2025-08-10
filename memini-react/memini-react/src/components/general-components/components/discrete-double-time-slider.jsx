import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Slider, Box, Typography } from "@mui/material";


const minutesInDay = 24 * 60;
const stepMinutes = 15;

const valueToTime = (value) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const DiscreteDoubleTimeSlider = forwardRef(function DiscreteDoubleTimeSlider(props, ref)  {
  const [timeRange, setTimeRange] = useState([480, 1020]); 

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    if (activeThumb === 0) {     
      if (newValue[0] >= timeRange[1]) return; // block if crossing end
      setTimeRange([newValue[0], timeRange[1]]);
    } else {
      if (newValue[1] <= timeRange[0]) return; // block if crossing start
      setTimeRange([timeRange[0], newValue[1]]);
    }
  };

   useImperativeHandle(ref, () => ({
    getValue: () => timeRange, // raw minutes
    getValueAsTime: () => timeRange.map(valueToTime), // formatted times
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Slider
        ref={ref}
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
        disableSwap // <- This stops MUI from swapping handles
      />    
    </Box>
  );
});

export default DiscreteDoubleTimeSlider;
