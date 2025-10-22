
import React, { useState } from 'react';
import MaterialUITheme1Profile from '../../../../styling/mui_theme_1/theme-profile';

import { Box, Chip, Typography } from '@mui/material';

interface CategoryMultiSelectProps {
  categories: string[];
  label?: string;
  paletteProfile?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  containerBorderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  categoryBorderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  spacingProfile?: keyof typeof MaterialUITheme1Profile.spacingProfiles;
  themeMode?: 'light' | 'dark';
  className?: string;
  containerPadding?: { px?: number; py?: number };
  categoryFontSize?: number;
  categoryFontVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  value?: string[];
  onChange?: (selected: string[]) => void;
}

const CategoryMultiSelect: React.FC<CategoryMultiSelectProps> = ({
  categories,
  label = "Categories",
  paletteProfile = 'main',
  containerBorderProfile = 'semiStraight',
  categoryBorderProfile = 'semiStraight',
  spacingProfile = 'compact',
  themeMode = 'light',
  className = '',
  containerPadding,
  categoryFontSize = 11,
  categoryFontVariant = 'subtitle2',
  value,
  onChange
}) => {
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  
  const selectedCategories = value !== undefined ? value : internalSelected;

  // Get theme values
  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][themeMode];
  const containerBorder = MaterialUITheme1Profile.borderProfiles[containerBorderProfile];
  const categoryBorder = MaterialUITheme1Profile.borderProfiles[categoryBorderProfile];
  const spacing = MaterialUITheme1Profile.spacingProfiles[spacingProfile];

  // Use custom padding if provided, otherwise use spacing profile
  const finalPadding = containerPadding || { px: spacing.px, py: spacing.py };

  // Sort categories alphabetically
  const sortedCategories = [...categories].sort((a, b) => 
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

  const handleToggle = (category: string) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    
    if (onChange) {
      onChange(newSelected);
    } else {
      setInternalSelected(newSelected);
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
          flexWrap: 'wrap',
          gap: 1,
          px: finalPadding.px,
          py: finalPadding.py,
          backgroundColor: palette.main,
          border: containerBorder.borderWidth + ' solid ' + palette.border,
          borderRadius: containerBorder.borderRadius,
          boxShadow: containerBorder.shadow,
        }}
      >
        {sortedCategories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <Chip
              key={category}
              label={
                <Typography variant={categoryFontVariant} fontSize={categoryFontSize}>
                  {category}
                </Typography>
              }
              onClick={() => handleToggle(category)}
              sx={{
                backgroundColor: isSelected ? palette.hover : palette.main,
                color: palette.text,
                border: 'none',
                borderRadius: categoryBorder.borderRadius,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: palette.hover,
                },
                cursor: 'pointer',
                height: 'auto',
                '& .MuiChip-label': {
                  px: spacing.px,
                  py: spacing.py,
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoryMultiSelect;