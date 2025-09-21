import React from 'react';
import {
  Paper, 
  SxProps,
  Theme
} from '@mui/material';

export interface MuiWrapperPaperProps {
  children: React.ReactNode;
  width?: number | string;
  minHeight?: number | string;
  height?: number | string;
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  sx?: SxProps<Theme>;
  elevation?: number;
  [key: string]: any; 
}

const MuiWrapperPaper: React.FC<MuiWrapperPaperProps> = ({ 
  children,
  width = 600,
  minHeight = 800,
  height,
  position = 'relative',
  overflow = 'hidden',
  sx = {},
  elevation,
  ...otherProps 
}) => {
  return (
    <Paper
      elevation={elevation }
      sx={{       
        width,
        minHeight,
        height,
        position,
        overflow,  
        ...sx,
      }}
      {...otherProps}
    >
      {children}
    </Paper>
  );
};

export default MuiWrapperPaper;