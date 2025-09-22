import PaletteColorProfile , {PaletteProfileType} from "../styling/mui_theme_1/palette-profile";

const StatusColorProfileMap : Record<string, PaletteProfileType> = {
  PASSED: 'main',
  UPCOMING: 'warning',
  FUTURE: 'harmonicBlue'
} as const;

type StatusType = keyof typeof StatusColorProfileMap;

interface StatusDotProps {

  color?: string; // fallback for custom colors
  size?: number;
  theme?: 'light' | 'dark';
  showBorder?: boolean;
  style?: React.CSSProperties;
}

const MUI_StyledStatusCircle = ({

  color,
  size = 8,
  theme = 'light',
  showBorder = false,
  style = {}
}: StatusDotProps) => {
  const getStyles = (): React.CSSProperties => {
    let backgroundColor = color;
    let borderColor = 'transparent';

  
      //const statusColorProfile = StatusColorProfileMap[statusType];
      const colorConfig = PaletteColorProfile.getColorConfig('main', theme);
      backgroundColor = colorConfig.backgroundColor;
      borderColor = showBorder ? colorConfig.borderColor || 'transparent' : 'transparent';
    

    return {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor: backgroundColor || '#22c55e',
      border: showBorder ? `1px solid ${borderColor}` : 'none',
      flexShrink: 0,
      marginRight: 5,
      ...style
    };
  };

  return <div style={getStyles()} />;
};


export { StatusColorProfileMap };
export type { StatusType };
export default MUI_StyledStatusCircle;