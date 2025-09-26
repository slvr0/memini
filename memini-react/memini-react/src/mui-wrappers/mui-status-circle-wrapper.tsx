import PaletteColorProfile , {PaletteProfileType} from "../styling/mui_theme_1/palette-profile";
import MaterialUITheme1Profile from "../styling/mui_theme_1/theme-profile";
  
export enum TaskStatus {
  PASSED = 'PASSED',
  UPCOMING = 'UPCOMING',
  FUTURE = 'FUTURE'
}

const StatusColorProfileMap: Record<TaskStatus, PaletteProfileType> = {
  [TaskStatus.PASSED]: 'main',
  [TaskStatus.UPCOMING]: 'warning',
  [TaskStatus.FUTURE]: 'harmonicBlue'
} as const;

type StatusType = TaskStatus;

interface StatusDotProps {
  status: TaskStatus, 
  size?: number;
  theme?: 'light' | 'dark';
  showBorder?: boolean;
  style?: React.CSSProperties;
}

const MUI_StyledStatusCircle = ({
  status,
  size = 8,
  theme = 'light',
  showBorder = false,
  style = {}
}: StatusDotProps) => {
  const getStyles = (): React.CSSProperties => {       
    const paletteProfileType = StatusColorProfileMap[status];
    const colorConfig = PaletteColorProfile.getColorConfig(paletteProfileType, theme);
    const backgroundColor = colorConfig.backgroundColor;
    let borderColor = 'transparent';
    borderColor = showBorder ? colorConfig.borderColor || 'transparent' : 'transparent';    
    
    return {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor: `${backgroundColor}`,
      border: showBorder ? `1px solid ${borderColor}` : 'none',
      flexShrink: 0,
      alignContent:'center',
      verticalAlign: 'middle',
      ...style
    };
  };

  return <div style={getStyles()} />;
};

export { StatusColorProfileMap };
export type { StatusType };
export default MUI_StyledStatusCircle;