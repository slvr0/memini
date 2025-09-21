import React from "react";
import { Box } from "@mui/material";
import MaterialUITheme1Profile from '../styling/mui_theme_1/theme-profile';
import { LucideProps } from "lucide-react";
import Tooltip from '@mui/material/Tooltip';

interface LucidIconButtonProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  size?: number; // icon size in px
  opacity?: number;
  palette?: keyof typeof MaterialUITheme1Profile.paletteProfiles;
  borderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  highlightBackgroundOnHover?: boolean;
  highlightBorderOnHover?: boolean;
  displayBorder?: boolean;
  tooltip?: string;
  className?: string;
  onClick?: (e: any) => void;
}

const LucidIconButton = React.forwardRef<SVGSVGElement, LucidIconButtonProps>(
  (
    {
      icon: Icon,
      size = 16,
      opacity = .75,
      palette: paletteKey = "main",
      borderProfile: borderKey = "square",
      highlightBackgroundOnHover = true,
      highlightBorderOnHover = true,
      displayBorder = false,
      tooltip = '',
      className = '',
      onClick,      
    },
    ref
  ) => {
    const palette = MaterialUITheme1Profile.paletteProfiles[paletteKey];
    const border = MaterialUITheme1Profile.borderProfiles[borderKey];

    return (
         <Tooltip title={tooltip} arrow>
            <Box
                className={className}
                component="button"
                onClick={onClick}
                ref={ref as React.Ref<HTMLButtonElement>}
                sx={{
                borderRadius: border.borderRadius,
                borderWidth: border.borderWidth,       
                boxShadow: border.shadow,   
                border: displayBorder ? `${border.borderWidth} solid ${palette.light.border}` : "none",          
                cursor: "pointer",
                color: palette.light.text,
                transition: "all 0.2s ease",
                opacity: opacity,              
                "&:hover": {
                    backgroundColor: highlightBackgroundOnHover ? palette.light.hover : undefined,
                    borderColor: highlightBorderOnHover ? palette.light.borderHover : undefined,
                    color: palette.light.text, 
                    opacity : opacity * 1.25
                },     
                }}
            >
                <Icon size={size} />
            </Box>
        </Tooltip>
    );
  }
);

LucidIconButton.displayName = "LucidIconButton";

export default LucidIconButton;
