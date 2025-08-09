import React, { useState } from 'react';
import {
  IconButton,
  Select,
  MenuItem,
  Typography,
  Box,
  useTheme,
  MenuProps as MuiMenuProps,
  styled,
} from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Custom styled Select to reduce padding & height
const SmallSelect = styled(Select)(({ theme }) => ({
  height: 32,
  minWidth: 80,
  '& .MuiSelect-select': {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 24,
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: '#fff',
    backgroundColor: '#1E2428',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255,255,255,0.3)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255,255,255,0.7)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#90caf9', // MUI primary light blue
  },
  '& .MuiSvgIcon-root': {
    color: '#90caf9',
    right: 6,
  },
}));

// Dark popup style for dropdown menu
const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: '#14181B',
      color: '#fff',
      '& .MuiMenuItem-root': {
        '&:hover': {
          backgroundColor: 'rgba(144,202,249,0.2)',
        },
      },
    },
  },
  MenuListProps: {
    dense: true,
  },
};

const DateSelector = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [monthIndex, setMonthIndex] = useState(today.getMonth());

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    setMonthIndex(today.getMonth());
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonthIndex(event.target.value);
  };

  const handleMonthIncrement = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };

  const handleMonthDecrement = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  // Year range ±10 years from current
  const yearOptions = [];
  for (let y = today.getFullYear() - 10; y <= today.getFullYear() + 10; y++) {
    yearOptions.push(y);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        backgroundColor: '#14181B',
        paddingX: 1,
        borderRadius: 0,
        userSelect: 'none',
        color: 'white',
      }}
    >
      {/* Year Select */}
      <SmallSelect
        value={year}
        onChange={handleYearChange}
        size="small"
        MenuProps={menuProps}
        variant="outlined"
      >
        {yearOptions.map((y) => (
          <MenuItem key={y} value={y}>
            {y}
          </MenuItem>
        ))}
      </SmallSelect>

      {/* Month Select */}
      <SmallSelect
        value={monthIndex}
        onChange={handleMonthChange}
        size="small"
        MenuProps={menuProps}
        variant="outlined"
      >
        {months.map((m, i) => (
          <MenuItem key={m} value={i}>
            {m}
          </MenuItem>
        ))}
      </SmallSelect>

      {/* Chevron buttons stacked vertically */}
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
        <IconButton
          onClick={handleMonthIncrement}
          color="primary"
          size="small"
          aria-label="Next Month"
          sx={{ padding: '4px', color: '#90caf9' }}
        >
          <ChevronRightIcon sx={{ transform: 'rotate(-90deg)' }} />
        </IconButton>
        <IconButton
          onClick={handleMonthDecrement}
          color="primary"
          size="small"
          aria-label="Previous Month"
          sx={{ padding: '4px', color: '#90caf9' }}
        >
          <ChevronRightIcon sx={{ transform: 'rotate(90deg)' }} />
        </IconButton>
      </Box>

      {/* Display selected year and month */}
      <Typography
        variant="subtitle1"
        sx={{ ml: 2, minWidth: 120, textAlign: 'right', userSelect: 'none' }}
      >
        {year} - {months[monthIndex]}
      </Typography>

      {/* Today Icon */}
      <IconButton
        onClick={handleTodayClick}
        color="primary"
        aria-label="Select Today"
        size="medium"
        sx={{ color: '#90caf9' }}
      >
        <TodayIcon />
      </IconButton>
    </Box>
  );
};

export default DateSelector;
