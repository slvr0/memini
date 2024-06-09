import React, { Component, createRef } from "react";
import CalendarWeekRow from "./calendar-week-row.jsx";
import CalendarNavigator from "./calendar-navigator.jsx";
import '../index.css';
import {getWeekDates, getFirstWeekInMonth} from "../computations/date-computations.js";



//Current day should change when clock goes over 23.59 ! :()
class Calendar extends Component{
    constructor(props){
        super(props);  

        //put in global context stuff later.
        this.dateNow = new Date();
        this.yearNow = this.dateNow.getFullYear();
        this.monthNow = this.dateNow.getMonth() + 1;
        this.dayNow =  this.dateNow.getDate();
        
        this.state = {
          selectedDate : {year: this.yearNow, month: this.monthNow}
        };
    }
    
    componentDidMount() {
      
    }

    onCalendarDateChange = (yearSelected, monthSelected) => {

      this.setState((prevState) => ({selectedDate: {year: yearSelected, month: monthSelected}})); 

    }

    calendarHeaderStyling = () => {
      return "font-family: ui-sans-serif m-5 space-x-1 font-medium";
    }

    calendarDateStyling = () => {
      return "text-center px-4 py-2 cursor-pointer transition duration-100 ease-in-out rounded-full";
    }

    calendarDateHoverStyle = () => {
      return "hover:bg-gray-300 hover:text-black hover:rounded-full";
    }

  render() { 

        //user controlled selection

        var userSelectedDisplayYear = this.state.selectedDate.year;
        var userSelectedDisplayMonth = this.state.selectedDate.month;

        var firstWeek = getFirstWeekInMonth(userSelectedDisplayYear,userSelectedDisplayMonth);

        var headerStyle = this.calendarHeaderStyling();
        var calendarDateStyle = this.calendarDateStyling();

        var displayWeeks = []
        var displayWeekDays = []
        
        for (var i = firstWeek; i < firstWeek + 5; i++) {
          displayWeeks.push(i);
          displayWeekDays.push(getWeekDates(userSelectedDisplayYear, i));
        }

        var calendarDateHoverStyle = this.calendarDateHoverStyle();
      
        return (
          <>
          <CalendarNavigator 
            selectedDate={this.state.selectedDate} 
            onInputChangeCallback={this.onCalendarDateChange}     
            />
              
              <div className="">
                  <table className="w-full">
                    <thead >
                      <tr>
                        <th className="font-thin">Week</th>
                        <th className={headerStyle}>Mon</th>
                        <th className={headerStyle}>Tue</th>
                        <th className={headerStyle}>Wed</th>
                        <th className={headerStyle}>Thu</th>
                        <th className={headerStyle}>Fri</th>
                        <th className={headerStyle}>Sat</th>
                        <th className={headerStyle}>Sun</th>
                      </tr>
                    </thead>

                    <tbody className={calendarDateStyle}>
                  
                    {                   
                      displayWeeks.map((week, index) => {                    
                        return (
                          <tr key={index}>
                            <td className="font-thin italic">{week}</td>
                            {
                              displayWeekDays[index].map((day, key) => {
                                const uniqueKey = `${index}-${key}`;
                                return (
                                  <td 
                                    className={`${calendarDateStyle} ${calendarDateHoverStyle}`} 
                                    key={uniqueKey}
                                  > { day.date() } </td>
                                );
                              })                    
                            }
                          </tr>
                        );
                      })                  
                    }                  
                    
                    </tbody>
                    
                  </table>
                </div>
        
          </>       
        );
    }
}

export default Calendar;








