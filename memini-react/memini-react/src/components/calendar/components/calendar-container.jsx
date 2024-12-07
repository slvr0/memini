import React, { useState } from "react";
import CalendarMonthDisplay  from "./calendar-month-display";
import CalendarNavigator from "./calendar-navigator";
import CalendarSelectedDate from "./calendar-selected-date";
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
        <div className="content-container calendar-container">          

          <div className="ui row memini-content-row">
            <CalendarNavigator
              selectedMonth = {selectedMonth}
              onChangeSelectedMonth = {onMonthChange}
              selectedYear = {selectedYear}
              onChangeSelectedYear = {onYearChange}
              currentYear={calendarDateState.selectedDate.year}    
              onClickSelectToday={onSetSelectedDateToToday}          
            />
          </div>

          <div className="ui row">
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








