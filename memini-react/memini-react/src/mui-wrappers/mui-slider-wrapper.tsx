import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import MaterialUITheme1Profile from "../styling/mui_theme_1/theme-profile"; 

interface ThemedSliderProps {
  label?: string;
  paletteProfile?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  themeMode?: 'light' | 'dark';
  labelFontSize?: number;
  labelFontVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  className?: string;
  min?: number;
  max?: number;
  discreteStep?: number;
  markerInterval?: number;
  showValue?: boolean;
  valueFontSize?: number;
  markerFontSize?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const MuiStyledSlider: React.FC<ThemedSliderProps> = ({
  label,
  paletteProfile = 'main',
  themeMode = 'light',
  labelFontSize = 11,
  labelFontVariant = 'subtitle2',
  className = '',
  min = 0,
  max = 100,
  discreteStep = 1,
  markerInterval,
  showValue = true,
  valueFontSize = 11,
  markerFontSize = 9,
  value,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState<number>(min);
  
  const currentValue = value !== undefined ? value : internalValue;

  // Get theme values
  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][themeMode];

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue;
    if (onChange) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };

  // Generate marks based on markerInterval
  const marks = markerInterval ? (() => {
    const markArray = [];
    for (let i = min; i <= max; i += markerInterval) {
      markArray.push({
        value: i,
        label: i.toString()
      });
    }
    // Ensure max is included if it's not already
    if (markArray[markArray.length - 1]?.value !== max) {
      markArray.push({
        value: max,
        label: max.toString()
      });
    }
    return markArray;
  })() : undefined;

  return (
    <Box 
      className={className}
      sx={{ width: '100%' }}
    >
      {(label || showValue) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          {label && (
            <Typography 
              variant={labelFontVariant} 
              fontSize={labelFontSize}
              sx={{ color: palette.text }}
            >
              {label}
            </Typography>
          )}
          {showValue && (
            <Typography 
              variant={labelFontVariant} 
              fontSize={valueFontSize}
              sx={{ color: palette.text, fontWeight: 600 }}
            >
              {currentValue}
            </Typography>
          )}
        </Box>
      )}
      <Slider
        value={currentValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={discreteStep}
        marks={marks}
        sx={{
          color: palette.hover,
          '& .MuiSlider-thumb': {
            backgroundColor: palette.hover,
            '&:hover, &.Mui-focusVisible': {
              boxShadow: `0 0 0 8px ${palette.hover}30`,
            },
          },
          '& .MuiSlider-track': {
            backgroundColor: palette.border,
            border: 'none',
          },
          '& .MuiSlider-rail': {
            backgroundColor: palette.hover,
            opacity: 1,
          },
          '& .MuiSlider-mark': {
            backgroundColor: palette.border,
            height: 8,
            width: 2,
          },
          '& .MuiSlider-markActive': {
            backgroundColor: palette.hover,
          },
          '& .MuiSlider-markLabel': {
            color: palette.text,
            fontSize: markerFontSize,
            opacity: 0.7,
          },
        }}
      />
    </Box>
  );
};

export default MuiStyledSlider;

// Usage Examples:
/*
// Default slider (0-100, step 1)
<ThemedSlider 
  label="Volume"
/>

// With controlled state
const [volume, setVolume] = useState<number>(50);
<ThemedSlider 
  label="Volume"
  value={volume}
  onChange={setVolume}
/>

// Custom range and step
<ThemedSlider 
  label="Price"
  min={0}
  max={1000}
  discreteStep={50}
  paletteProfile="harmonicGreen"
/>

// Temperature slider with decimal steps
<ThemedSlider 
  label="Temperature (°C)"
  min={-10}
  max={40}
  discreteStep={0.5}
  paletteProfile="harmonicBlue"
  labelFontSize={12}
/>

// Without value display
<ThemedSlider 
  label="Opacity"
  min={0}
  max={1}
  discreteStep={0.1}
  showValue={false}
/>

// Custom typography
<ThemedSlider 
  label="Brightness"
  min={0}
  max={100}
  discreteStep={5}
  labelFontSize={13}
  labelFontVariant="body2"
  valueFontSize={12}
  paletteProfile="warning"
/>

// Multiple sliders
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  <ThemedSlider label="Red" min={0} max={255} paletteProfile="harmonicRed" />
  <ThemedSlider label="Green" min={0} max={255} paletteProfile="harmonicGreen" />
  <ThemedSlider label="Blue" min={0} max={255} paletteProfile="harmonicBlue" />
</Box>
*/