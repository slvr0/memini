import { Button, ButtonProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MaterialUITheme1Profile from '../styling/mui_theme_1/theme-profile';


interface MUI_StyledButtonProps extends ButtonProps {
  themeColor?: 'light' | 'dark';
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  buttonVariant?: 'main' | 'warning';
  borderType?: 'rounded' | 'straight';
  opacity?: number;
  highlightBackgroundOnHover?: boolean,
  highlightBorderOnHover?: boolean,
  applyThemeFontColor?: boolean
}

interface ButtonPreset {
  palette: (typeof MaterialUITheme1Profile.paletteProfiles)[keyof typeof MaterialUITheme1Profile.paletteProfiles];
  spacing: (typeof MaterialUITheme1Profile.spacingProfiles)[keyof typeof MaterialUITheme1Profile.spacingProfiles];
  borderProfile: (typeof MaterialUITheme1Profile.borderProfiles)[keyof typeof MaterialUITheme1Profile.borderProfiles];    
}

function getButtonPresets (
  themeColor?: 'light' | 'dark', // we dont apply it yet TODO
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg',
  buttonVariant?: 'main' | 'warning',
  borderType?: 'rounded' | 'straight'  

) : ButtonPreset{

  const buttonPalette = MaterialUITheme1Profile.paletteProfiles[buttonVariant ?? 'main'];
  const border = MaterialUITheme1Profile.borderProfiles[borderType ?? 'rounded'];
  var spacing: (typeof MaterialUITheme1Profile.spacingProfiles)[keyof typeof MaterialUITheme1Profile.spacingProfiles];

  switch(buttonSize) {
    case 'xs' : {
      spacing = MaterialUITheme1Profile.spacingProfiles.tiny;
      break;
    }
    case 'sm': {      
      spacing = MaterialUITheme1Profile.spacingProfiles.compact;
      break;
    }
    case 'md': {
      spacing = MaterialUITheme1Profile.spacingProfiles.medium;
      break;
    }
    case 'lg': {   
      spacing = MaterialUITheme1Profile.spacingProfiles.roomy;
      break;
    }
    default: {
      spacing = MaterialUITheme1Profile.spacingProfiles.compact;
      break;
    }
  }

  return {
    palette: buttonPalette,   
    spacing: spacing,
    borderProfile: border   
  }
}

const MUI_StyledButton = styled(Button, {
  shouldForwardProp: (prop) => ![
    'themeColor',
    'buttonSize', 
    'buttonVariant',
    'borderType',
    'opacity',
    'highlightBackgroundOnHover',
    'highlightBorderOnHover',
    'applyThemeFontColor'].includes(prop as string),
})<MUI_StyledButtonProps>(({ 
  themeColor = 'light', buttonSize = 'sm', buttonVariant = 'main', borderType = 'rounded', opacity = 1.0,
  highlightBackgroundOnHover = true,  highlightBorderOnHover = true, applyThemeFontColor = false }) => {

  var buttonPresets = getButtonPresets(
    themeColor, 
    buttonSize,
    buttonVariant,
    borderType
  )

  return {

    borderRadius: buttonPresets.borderProfile.borderRadius,
    borderWidth: buttonPresets.borderProfile.borderWidth,
    borderColor: buttonPresets.palette.light.border,
    border: `${buttonPresets.borderProfile.borderWidth} solid ${buttonPresets.palette.light.border}`, // solid should be controllable on the border profile
    boxShadow: buttonPresets.borderProfile.shadow,    
    color: buttonPresets.palette.light.text,   
    backgroundColor: buttonPresets.palette.light.main,

    paddingLeft: `${buttonPresets.spacing.px * 8}px`,   
    paddingRight: `${buttonPresets.spacing.px * 8}px`,
    paddingTop: `${buttonPresets.spacing.py * 8}px`,    
    paddingBottom: `${buttonPresets.spacing.py * 8}px`,
    marginLeft: `${buttonPresets.spacing.mx * 8}px`,    
    marginRight: `${buttonPresets.spacing.mx * 8}px`,
    marginTop: `${buttonPresets.spacing.my * 8}px`,     
    marginBottom: `${buttonPresets.spacing.my * 8}px`,    
    
    minWidth: 'auto', 
    width: 'fit-content',
    '& > *': {
    opacity: opacity,
    },
    
    '&:hover': {
      backgroundColor: highlightBackgroundOnHover && buttonPresets.palette.light.hover, 
      borderColor: highlightBorderOnHover && buttonPresets.palette.light.borderHover
    },
    '& .MuiTypography-root': {
      textTransform: 'none', 
      color: applyThemeFontColor && buttonPresets.palette.light.border             
    }
  };
});

export default MUI_StyledButton;
