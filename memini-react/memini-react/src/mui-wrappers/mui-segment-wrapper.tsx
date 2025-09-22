import MaterialUITheme1Profile from "../styling/mui_theme_1/theme-profile";

import {Box} from "@mui/material";

interface MUI_StyledSegmentProps {
  borderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  palette?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  spacing?: keyof typeof MaterialUITheme1Profile.spacingProfiles;
  borderCoverage?: Array<number>;
  highlightBackgroundOnHover?: boolean;
  highlightBorderOnHover?: boolean;
  className?: string;
  children?: React.ReactNode;
  onHover?: Function;
  onHoverOut?: Function;
}

const MUI_StyledSegment: React.FC<MUI_StyledSegmentProps> = (props) => {
  const palette = MaterialUITheme1Profile.paletteProfiles[props.palette ?? 'main'];
  const spacing = MaterialUITheme1Profile.spacingProfiles[props.spacing  ?? 'segmentMedium'];
  const border  = MaterialUITheme1Profile.borderProfiles[props.borderProfile ?? 'square'];
  const borderCoverage = props.borderCoverage ?? [1.0, 1.0, 1.0, 1.0]
  const borderWidthNumber = parseFloat(border.borderWidth);

  return (
   <Box
        className={props.className}
        onMouseEnter={() => props.onHover && props.onHover()}
        onMouseLeave={() => props.onHoverOut && props.onHoverOut()}    
        sx={{
            borderRadius: border.borderRadius,
            borderWidth: `${borderCoverage[0] * borderWidthNumber}px ${borderCoverage[1] * borderWidthNumber}px ${borderCoverage[2] * borderWidthNumber}px ${borderCoverage[3] * borderWidthNumber}px`,
            borderColor: 'bg-gray-200',
            border: `${border.borderWidth} solid bg-gray-200`,
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
