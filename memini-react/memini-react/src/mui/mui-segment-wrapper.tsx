import MaterialUITheme1Profile from '../styling/mui_theme_1/theme-profile';
import {Box} from "@mui/material";

interface MUI_StyledSegmentProps {
  borderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  palette?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  spacing?: keyof typeof MaterialUITheme1Profile.spacingProfiles;
  highlightBackgroundOnHover?: boolean;
  highlightBorderOnHover?: boolean;
  children?: React.ReactNode;
}

const MUI_StyledSegment: React.FC<MUI_StyledSegmentProps> = (props) => {
  const palette = MaterialUITheme1Profile.paletteProfiles[props.palette ?? 'main'];
  const spacing = MaterialUITheme1Profile.spacingProfiles[props.spacing  ?? 'segmentMedium'];
  const border  = MaterialUITheme1Profile.borderProfiles[props.borderProfile ?? 'square'];
  console.log(spacing);
  return (
   <Box
        sx={{
            borderRadius: border.borderRadius,
            borderWidth: border.borderWidth,
            borderColor: palette.light.border,
            border: `${border.borderWidth} solid ${palette.light.border}`,
            boxShadow: border.shadow,    

            display: 'flex',
            alignItems: 'center',
            px: spacing.px,
            py: spacing.py,
            mx: spacing.mx,
            my: spacing.my,
            color: palette.light.text,
            '&:hover': {
            backgroundColor: props.highlightBackgroundOnHover ? palette.light.hover : undefined,
            borderColor: props.highlightBorderOnHover ? palette.light.borderHover : undefined,
            },
            '& .MuiTypography-root': {
            textTransform: 'none',
            },
            '& > *': {
              padding: `${spacing.py * 8}px ${spacing.px * 8}px`, 
              margin: `${spacing.my * 8}px ${spacing.mx * 8}px`, 
            },
        }}
        >
        {props.children}
    </Box>
     
  
  );
};

export default MUI_StyledSegment;
