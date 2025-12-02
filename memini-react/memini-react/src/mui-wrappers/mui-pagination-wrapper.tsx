import React from 'react';
import { Pagination, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

interface PaginationControlProps {
  totalPages: number;
  currentPage: number;
  totalItems?: number;
  pageSize?: number;
  onChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  variant?: 'text' | 'outlined';
  color?: 'primary' | 'secondary' | 'standard';
  customColor?: CustomPalette;  
  disabled?: boolean;
  showPageSizeSelector?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

interface CustomPalette {
  main: string;
  hover: string;
  text: string;
  border: string;
  borderHover: string;
}

export const MuiStyledPagination: React.FC<PaginationControlProps> = ({
  totalPages,
  currentPage,
  totalItems,
  pageSize = 20,
  onChange,
  onPageSizeChange,
  variant = 'outlined',
  color = 'primary',
  customColor,
  disabled = false,
  showPageSizeSelector = false,
  className = '',
  size = 'medium',
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onChange(page);
  };

  const handlePageSizeChange = (event: any) => {
    if (onPageSizeChange) {
      onPageSizeChange(Number(event.target.value));
    }
  };
  
  if (totalItems === 0) {
    return null;
  }

  // Convert hex to rgba for 30% opacity
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  return (
    <div className={`flex justify-center items-center gap-4 py-4 ${className}`}>
      <Pagination 
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant={variant}
        color={customColor ? 'standard' : color}
        size={size}
        disabled={disabled}
        showFirstButton
        showLastButton
        sx={customColor ? {
          '& .MuiPaginationItem-root': {
            color: customColor.text,
            borderColor: hexToRgba(customColor.text, 0.1),
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: customColor.main,
            color: customColor.text,
            borderColor: hexToRgba(customColor.border, 1.0),
            '&:hover': {
              backgroundColor: customColor.hover,
              borderColor: customColor.borderHover,
            },
          },
          '& .MuiPaginationItem-root:hover:not(.Mui-selected)': {
            backgroundColor: hexToRgba(customColor.hover, 0.1),
            borderColor: hexToRgba(customColor.text, 0.5),
          },
        } : undefined}
      />
      
      {showPageSizeSelector && onPageSizeChange && (
        <FormControl size="small" disabled={disabled}>
          <InputLabel>Per page</InputLabel>
          <Select
            value={pageSize}
            label="Per page"
            onChange={handlePageSizeChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      )}

      {(totalItems && totalItems > 0) && 
        <Typography variant="subtitle2" color="text.secondary">
          page {currentPage} of {totalPages} ({totalItems} total results)
        </Typography>
      }
    </div>
  );
};

export default MuiStyledPagination;