import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { calendarDateActions } from "../../../redux-memini-store.js";
import moment from 'moment';


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

  const dispatch          = useDispatch();
  const calendarDateState = useSelector((state) => state.calendarDate);  
  const today = moment();

  const [selectedMonth, setSelectedMonth]   = useState(calendarDateState.selectedDate.month);
  const [selectedYear,  setSelectedYear]    = useState(calendarDateState.selectedDate.year);  

  const onUpdateDate = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    dispatch(calendarDateActions.setSelectedYearMonth({year: year, month: month}));  
  }

  const handleTodayClick = () => {
    setSelectedYear(today.year());
    setSelectedMonth(today.month());
    dispatch(calendarDateActions.setSelectedDate({newDate:calendarDateState.todaysDate})); 
  };

  const handleYearChange = (event) => {
    onUpdateDate(event.target.value, selectedMonth);
  };

  const handleMonthChange = (event) => {
    onUpdateDate(selectedYear, event.target.value);
  };

  const handleMonthIncrement = () => {
    if (selectedMonth === 11) {
      onUpdateDate(selectedYear + 1, 0);
    } else {
      onUpdateDate(selectedYear, selectedMonth + 1);
    }
  };

  const handleMonthDecrement = () => {    
    if (selectedMonth === 0) {    
      onUpdateDate(selectedYear - 1, 11);
    } else {
      onUpdateDate(selectedYear, selectedMonth - 1);
    }
  };

  // selectedYear range ±10 years from current
  const yearOptions = [];
  for (let y = today.year() - 10; y <= today.year() + 10; y++) {
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
      {/* selectedYear Select */}
      <SmallSelect
        value={selectedYear}
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
        value={selectedMonth}
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

      {/* Display selected selectedYear and month */}
      <Typography
        variant="subtitle1"
        sx={{ ml: 2, minWidth: 120, textAlign: 'right', userSelect: 'none' }}
      >
        {selectedYear} - {months[selectedMonth]}
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
