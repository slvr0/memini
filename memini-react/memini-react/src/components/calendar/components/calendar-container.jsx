import React, { useState } from "react";
import CalendarMonthDisplay  from "./calendar-month-display";
import CalendarNavigator from "./calendar-navigator";
import {useSelector, useDispatch} from 'react-redux';
import { calendarDateActions } from "../../../redux-memini-store.js";

const CalendarContainer = () => {  
    const dispatch          = useDispatch();
    const calendarDateState = useSelector((state) => state.calendarDate);  
    const [selectedMonth, setSelectedMonth]   = useState(calendarDateState.selectedDate.month);
    const [selectedYear,  setSelectedYear]    = useState(calendarDateState.selectedDate.year); 
    const onMonthChange = (selectedMonth)     => setSelectedMonth(selectedMonth); 
    const onYearChange  = (selectedYear)      => setSelectedYear(selectedYear);

    const onSetSelectedDateToToday = () => {    
      setSelectedMonth(calendarDateState.todaysDate.month);
      setSelectedYear(calendarDateState.todaysDate.year);
      dispatch(calendarDateActions.setSelectedDate({newDate:calendarDateState.todaysDate}));  
    }

    return (
      <>
        <div className="">
          <div className="mb-2">
            <CalendarMonthDisplay
              selectedMonth = {selectedMonth}
              selectedYear  = {selectedYear}
            ></CalendarMonthDisplay>
          </div>
        </div>
      </>
      
    );

}

export default CalendarContainer;








