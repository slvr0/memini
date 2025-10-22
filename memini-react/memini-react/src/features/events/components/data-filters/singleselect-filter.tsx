import React, { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import MaterialUITheme1Profile from '../../../../styling/mui_theme_1/theme-profile';

interface CategorySingleSelectProps {
  options: string[];
  label?: string;
  paletteProfile?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  containerBorderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  optionBorderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  spacingProfile?: keyof typeof MaterialUITheme1Profile.spacingProfiles;
  themeMode?: 'light' | 'dark';
  className?: string;
  containerPadding?: { px?: number; py?: number };
  optionFontSize?: number;
  optionFontVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  value?: string;
  onChange?: (selected: string) => void;
}

const CategorySingleSelect: React.FC<CategorySingleSelectProps> = ({
  options,
  label = "Options",
  paletteProfile = 'main',
  containerBorderProfile = 'semiStraight',
  optionBorderProfile = 'semiStraight',
  spacingProfile = 'compact',
  themeMode = 'light',
  className = '',
  containerPadding,
  optionFontSize = 11,
  optionFontVariant = 'subtitle2',
  value,
  onChange
}) => {
  const [internalSelected, setInternalSelected] = useState<string>('');
  
  const selectedOption = value !== undefined ? value : internalSelected;

  // Get theme values
  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][themeMode];
  const containerBorder = MaterialUITheme1Profile.borderProfiles[containerBorderProfile];
  const optionBorder = MaterialUITheme1Profile.borderProfiles[optionBorderProfile];
  const spacing = MaterialUITheme1Profile.spacingProfiles[spacingProfile];

  // Use custom padding if provided, otherwise use spacing profile
  const finalPadding = containerPadding || { px: spacing.px, py: spacing.py };

  const handleSelect = (option: string) => {
    if (onChange) {
      onChange(option);
    } else {
      setInternalSelected(option);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Typography variant="subtitle2" fontSize={11} sx={{ mb: 1, color: palette.text }}>
          {label}
        </Typography>
      )}
      <Box
        className={className}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          px: finalPadding.px,
          py: finalPadding.py,
          backgroundColor: palette.main,
          border: containerBorder.borderWidth + ' solid ' + palette.border,
          borderRadius: containerBorder.borderRadius,
          boxShadow: containerBorder.shadow,
        }}
      >
        {options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <Chip
              key={option}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: isSelected ? palette.borderHover : 'transparent',
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant={optionFontVariant} fontSize={optionFontSize}>
                    {option}
                  </Typography>
                </Box>
              }
              onClick={() => handleSelect(option)}
              sx={{
                backgroundColor: isSelected ? palette.hover : palette.main,
                color: palette.text,
                border: 'none',
                borderRadius: optionBorder.borderRadius,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: palette.hover,
                },
                cursor: 'pointer',
                height: 'auto',
                width: '100%',
                justifyContent: 'flex-start',
                '& .MuiChip-label': {
                  px: spacing.px,
                  py: spacing.py,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CategorySingleSelect;

// Usage Examples:
/*
const options = ["Daily", "Weekly", "Monthly", "Yearly"];

<CategorySingleSelect 
  options={options}
  label="Select View"
  paletteProfile="harmonicBlue"
  containerBorderProfile="rounded"
  optionBorderProfile="rounded"
  containerPadding={{ px: 2, py: 1.5 }}
  optionFontSize={12}
  optionFontVariant="body2"
/>

// Default - single selection
<CategorySingleSelect 
  options={options}
  label="Select Period"
/>

// With controlled state
const [selected, setSelected] = useState<string>('Weekly');
<CategorySingleSelect 
  options={options}
  value={selected}
  onChange={setSelected}
  label="Select Period"
/>

// Custom styling


// Minimal padding, smaller text
<CategorySingleSelect 
  options={options}
  containerPadding={{ px: 1, py: 0.5 }}
  optionFontSize={10}
  className="w-full"
/>

// Different palette
<CategorySingleSelect 
  options={["Option A", "Option B", "Option C"]}
  paletteProfile="harmonicGreen"
  containerBorderProfile="square"
  optionBorderProfile="semiStraight"
/>
*/