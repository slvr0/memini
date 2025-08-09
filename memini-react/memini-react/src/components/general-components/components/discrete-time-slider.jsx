import React, { useState } from "react";
import "../css/discrete-time-slider.css";

const DiscreteTimeSlider = (props) => {

  const [sliderValue, setSliderValue] = useState(0);

  const minutesToTime = (minutes) => {
    const hrs = Math.floor(minutes / 60).toString().padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}`;
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setSliderValue(value);
  };

  const percentage = (sliderValue / (24 * 60)) * 100;
  return (
    <div className="discrete-time-slider-wrapper">
     <input
        ref={props.fieldListener.ref}
        type="range"
        min={0}
        max={1440}
        step={15}
        value={sliderValue}
        onChange={handleChange}
        className="discrete-time-slider"
        style={{ '--value': `${percentage}%` }}
    />
      <div className="slider-value">{minutesToTime(sliderValue)}</div>
    </div>
  );
};

export default DiscreteTimeSlider;