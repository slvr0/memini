import React, { forwardRef, CSSProperties } from 'react';
import { Select, SelectProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import MaterialUITheme1Profile from '../styling/mui_theme_1/theme-profile'; // adjust path

// Define the theme input props interface
interface ThemeInputProps {
  paletteProfile?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  borderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  spacingProfile?: keyof typeof MaterialUITheme1Profile.spacingProfiles;
  mode?: 'light' | 'dark';
  fontSize?: string;
  labelFontSize?: string;
  labelOpacity?: number;
  // Dropdown menu styling
  menuItemFontSize?: string;
  menuItemOpacity?: number;
  menuMaxHeight?: number;
  scrollbarWidth?: string;
  scrollbarThumbColor?: string;
  scrollbarTrackColor?: string;
  customStyle?: CSSProperties;
  children?: React.ReactNode;
}

interface StyledSelectProps extends Omit<SelectProps, 'inputRef'> {
  themeProps?: ThemeInputProps;
}
const BaseStyledSelect = styled(Select, {shouldForwardProp: (prop) => ![
    'paletteProfile',
    'borderProfile',
    'spacingProfile',
    'mode',
    'fontSize',
    'labelFontSize',
    'labelOpacity',
    'menuItemFontSize',
    'menuItemOpacity',
    'menuMaxHeight',
    'scrollbarWidth',
    'scrollbarThumbColor',
    'scrollbarTrackColor',
    'customStyle',
    'themeProps' 
  ].includes(prop as string),
})<StyledSelectProps>(({ theme, themeProps }) => {
  const paletteProfile = themeProps?.paletteProfile || 'main';
  const borderProfile = themeProps?.borderProfile || 'straight';
  const spacingProfile = themeProps?.spacingProfile || 'medium';
  const mode = themeProps?.mode || 'light';

  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][mode];
  const border = MaterialUITheme1Profile.borderProfiles[borderProfile];
  const spacing = MaterialUITheme1Profile.spacingProfiles[spacingProfile];

  const labelOpacity = themeProps?.labelOpacity || 0.7;

  return {    
    fontSize: themeProps?.fontSize || '14px',
    color: palette.text,
    borderRadius: border.borderRadius,
    boxShadow: border.shadow,
    '& fieldset': {
      borderColor: palette.border,
      borderWidth: border.borderWidth,
    },
    '&:hover fieldset': {
      borderColor: palette.borderHover,
    },
    '&.Mui-focused fieldset': {
      borderColor: palette.borderHover,
    },
    // Select-specific styling
    '& .MuiSelect-select': {
      fontSize: themeProps?.fontSize || '14px',
      color: palette.text,
      ...themeProps?.customStyle,
    },
    '& .MuiSelect-icon': {
      color: palette.text,
      opacity: labelOpacity,
    },
  };
});

const MuiStyledSelect = forwardRef<HTMLSelectElement, StyledSelectProps>((props, ref) => {
  const { themeProps, MenuProps, ...otherProps } = props;
  
  const paletteProfile = themeProps?.paletteProfile || 'main';
  const borderProfile = themeProps?.borderProfile || 'straight';
  const mode = themeProps?.mode || 'light';
  
  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][mode];
  const border = MaterialUITheme1Profile.borderProfiles[borderProfile];
  
  return (
    <BaseStyledSelect 
      {...otherProps} 
      inputRef={ref} 
      themeProps={themeProps}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: themeProps?.menuMaxHeight || 300,
            borderRadius: border.borderRadius,
            boxShadow: border.shadow,
            // Menu item styling with seamless theme integration
            '& .MuiMenuItem-root': {
              fontSize: themeProps?.menuItemFontSize || themeProps?.fontSize || '14px',
              opacity: themeProps?.menuItemOpacity || 1,
              color: palette.text,
              '&:hover': {
                backgroundColor: palette.hover,
              },
              '&.Mui-selected': {
                backgroundColor: palette.main,
                '&:hover': {
                  backgroundColor: palette.hover,
                },
              },
            },
            // Custom scrollbar styling
            '& .MuiList-root': {
              '&::-webkit-scrollbar': {
                width: themeProps?.scrollbarWidth || '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: themeProps?.scrollbarTrackColor || '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: themeProps?.scrollbarThumbColor || '#c1c1c1',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#a8a8a8',
                },
              },
            },
          },
          ...MenuProps?.PaperProps,
        },
        ...MenuProps,
      }}
    />
  );
});

MuiStyledSelect.displayName = 'MuiStyledSelect';

export default MuiStyledSelect;