import React, { useState } from 'react';
import MaterialUITheme1Profile from '../../../../styling/mui_theme_1/theme-profile';

import { Box, Chip, Typography } from '@mui/material';

interface CategoryEnumItem {
  EnumValue: number;
  Description: string;
}

interface CategoryMultiSelectEnumProps {
  categories: CategoryEnumItem[];
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
  selectedDescriptions?: string[];
  selectedEnumValue?: number;
  onChange?: (selectedDescriptions: string[], selectedEnumValue: number) => void;
}

const CategoryMultiSelectEnum: React.FC<CategoryMultiSelectEnumProps> = ({
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
  selectedDescriptions,
  selectedEnumValue,
  onChange
}) => {
  const [internalSelectedDescriptions, setInternalSelectedDescriptions] = useState<string[]>([]);
  const [internalSelectedEnumValue, setInternalSelectedEnumValue] = useState<number>(0);
  
  const activeDescriptions = selectedDescriptions !== undefined ? selectedDescriptions : internalSelectedDescriptions;
  const activeEnumValue = selectedEnumValue !== undefined ? selectedEnumValue : internalSelectedEnumValue;

  // Get theme values
  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][themeMode];
  const containerBorder = MaterialUITheme1Profile.borderProfiles[containerBorderProfile];
  const categoryBorder = MaterialUITheme1Profile.borderProfiles[categoryBorderProfile];
  const spacing = MaterialUITheme1Profile.spacingProfiles[spacingProfile];

  // Use custom padding if provided, otherwise use spacing profile
  const finalPadding = containerPadding || { px: spacing.px, py: spacing.py };

  // Sort categories alphabetically by description
  const sortedCategories = [...categories].sort((a, b) => 
    a.Description.localeCompare(b.Description, undefined, { sensitivity: 'base' })
  );

  const handleToggle = (category: CategoryEnumItem) => {
    const isCurrentlySelected = activeDescriptions.includes(category.Description);
    
    let newDescriptions: string[];
    let newEnumValue: number;
    
    if (isCurrentlySelected) {
      // Remove from selection
      newDescriptions = activeDescriptions.filter((d) => d !== category.Description);
      newEnumValue = activeEnumValue - category.EnumValue;
    } else {
      // Add to selection
      newDescriptions = [...activeDescriptions, category.Description];
      newEnumValue = activeEnumValue + category.EnumValue;
    }
    
    if (onChange) {
      onChange(newDescriptions, newEnumValue);
    } else {
      setInternalSelectedDescriptions(newDescriptions);
      setInternalSelectedEnumValue(newEnumValue);
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
          const isSelected = activeDescriptions.includes(category.Description);
          return (
            <Chip
              key={category.Description}
              label={
                <Typography variant={categoryFontVariant} fontSize={categoryFontSize}>
                  {category.Description}
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
      {/* Optional: Display current enum value for debugging */}
      {/* <Typography variant="caption" sx={{ mt: 1, color: palette.text }}>
        Selected Enum Value: {activeEnumValue}
      </Typography> */}
    </Box>
  );
};

export default CategoryMultiSelectEnum;