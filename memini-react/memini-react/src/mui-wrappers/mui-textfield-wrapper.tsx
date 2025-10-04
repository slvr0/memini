import React, { forwardRef, CSSProperties } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import MaterialUITheme1Profile from '../styling/mui_theme_1/theme-profile'; // adjust path
import { Opacity } from '@mui/icons-material';

// Define the theme input props interface
interface ThemeInputProps {
  paletteProfile?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  borderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  spacingProfile?: keyof typeof MaterialUITheme1Profile.spacingProfiles;
  mode?: 'light' | 'dark';
  fontSize?: string;
  labelFontSize?: string;
  labelOpacity?: number;


  helperTextFontSize?: string;
  helperTextOpacity?: number;
  customStyle?: CSSProperties;
}

interface StyledTextFieldProps extends Omit<TextFieldProps, 'ref'> {
  themeProps?: ThemeInputProps;
}

const BaseStyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => !['themeProps'].includes(prop as string),
})<StyledTextFieldProps>(({ theme, themeProps }) => {
  const paletteProfile = themeProps?.paletteProfile || 'main';
  const borderProfile = themeProps?.borderProfile || 'straight';
  const spacingProfile = themeProps?.spacingProfile || 'medium';
  const mode = themeProps?.mode || 'light';

  const palette = MaterialUITheme1Profile.paletteProfiles[paletteProfile][mode];
  const border = MaterialUITheme1Profile.borderProfiles[borderProfile];
  const spacing = MaterialUITheme1Profile.spacingProfiles[spacingProfile];

  const labelOpacity = themeProps?.labelOpacity || 0.7;

  const helperTextFontSize = themeProps?.helperTextFontSize || '10px';
  const helperTextOpacity = themeProps?.helperTextOpacity || 0.6;

  return {    
    '& .MuiInputBase-input': {
      fontSize: themeProps?.fontSize || '14px',
      color: palette.text, 
      ...themeProps?.customStyle,     
    },
    '& .MuiOutlinedInput-root': {     
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
    },
    '& .MuiInputLabel-root': {
      fontSize: themeProps?.labelFontSize || '14px',
      color: palette.text,
      opacity: labelOpacity
    },
    '& .MuiFormHelperText-root': {
        fontSize: themeProps?.helperTextFontSize || '12px',
        opacity: themeProps?.helperTextOpacity || 0.7,
        color: palette.text,
        '&.Mui-error': {
            opacity: 1, // full opacity for error messages
    },
    },
  };
});

const MuiStyledTextField = forwardRef<HTMLInputElement, StyledTextFieldProps>((props, ref) => (
  <BaseStyledTextField {...props} ref={ref} />
));
export default MuiStyledTextField;