import React, { useState } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import MaterialUITheme1Profile from "../styling/mui_theme_1/theme-profile"; 

interface ThemedSwitchProps {
  enabled?: boolean;
  label?: string;
  paletteProfile?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  themeMode?: 'light' | 'dark';
  labelFontSize?: number;
  labelFontVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  className?: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
}

const MuiStyledSwitch: React.FC<ThemedSwitchProps> = ({
  enabled = true,
  label,
  paletteProfile = 'main',
  themeMode = 'light',
  labelFontSize = 11,
  labelFontVariant = 'subtitle2',
  className = '',
  value,
  onChange
}) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(false);
  
  const checked = value !== undefined ? value : internalChecked;

  // Get theme values
  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][themeMode];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    } else {
      setInternalChecked(event.target.checked);
    }
  };

  return (
    <Box 
      className={className}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1 
      }}
    >
      <Switch
        disabled={!enabled}
        checked={checked}
        onChange={handleChange}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: `${palette.main}`,   
            '&:hover': {
              backgroundColor: `${palette.hover}20`,
            },
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: palette.border,
            opacity:0.75,
          },
          '& .MuiSwitch-track': {
            backgroundColor: palette.border,
             opacity:0.1,
          },
        }}
      />
      {label && (
        <Typography 
          variant={labelFontVariant} 
          fontSize={labelFontSize}
          sx={{ color: palette.text, cursor: 'pointer' }}
          onClick={() => handleChange({ target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>)}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default MuiStyledSwitch;