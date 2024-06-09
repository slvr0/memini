import React, { Component, createRef } from "react";
import CalendarWeekRow from "./calendar-week-row.jsx";
import CalendarNavigator from "./calendar-navigator.jsx";
import '../index.css';
import twStyle from './calendar.css';
import {getWeekDates, getFirstWeekInMonth, evaluateTodayIsPartOfWeekspan} from "../computations/date-computations.js";



//Current day should change when clock goes over 23.59 ! :()
class Calendar extends Component{
    constructor(props){
        super(props);  

        //put in global context stuff later.
        this.dateNow = new Date();
        this.yearNow = this.dateNow.getFullYear();
        this.monthNow = this.dateNow.getMonth() + 1;
        this.dayNow =  this.dateNow.getDate();        
        
    }
    
    componentDidMount() {
      
    }

    calendarHeaderStyling = () => {
      return "font-family: ui-sans-serif m-5 space-x-1 font-medium";
    }

    calendarDateStyling = () => {
      return "text-center px-4 py-2 cursor-pointer transition duration-100 ease-in-out rounded-full";
    }

    calendarDateHoverStyle = () => {
      return "hover:bg-green-300 hover:text-black hover:rounded-full";
    }

  render() { 

        //user controlled selection

        var userSelectedDisplayYear = this.props.selectedDate.year;
        var userSelectedDisplayMonth = this.props.selectedDate.month;        

        var firstWeek = getFirstWeekInMonth(userSelectedDisplayYear,userSelectedDisplayMonth);
        var dayOfWeek = (this.dateNow.getDay() + 6) % 7;
        var headerStyle = this.calendarHeaderStyling();
        var calendarDateStyle = this.calendarDateStyling();

        var displayWeeks = []
        var displayWeekDays = []
        
        for (var i = firstWeek; i < firstWeek + 5; i++) {
          displayWeeks.push(i);
          displayWeekDays.push(getWeekDates(userSelectedDisplayYear, i));
        }

        const {isInWeek, weekIndex} = evaluateTodayIsPartOfWeekspan(this.dateNow, displayWeeks, this.yearNow);


        var calendarDateHoverStyle = this.calendarDateHoverStyle();

      
        return (
          <>  
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

                    <tbody >
                  
                    {                   
                      displayWeeks.map((week, index) => {  
                        const isCurrentWeek = index === weekIndex;

                        return (
                          <tr key={index} className={isCurrentWeek ? 'currentWeek' : ''}>
                            <td className={`${calendarDateStyle} font-thin italic` }  >{week}</td>
                            {
                              displayWeekDays[index].map((day, key) => {

                                const isCurrentDay = isCurrentWeek && (dayOfWeek === key);
                                const uniqueKey = `${index}-${key}`;
                                return (
                                  <td
                                    className={`${calendarDateStyle} ${calendarDateHoverStyle} ${isCurrentDay ? 'currentDay' : ''}`}
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








