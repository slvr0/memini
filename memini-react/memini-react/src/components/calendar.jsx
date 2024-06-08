import React, { Component } from "react";
import CalendarWeekRow from "./calendar-week-row.jsx";

import '../index.css';
import {getAllDaysInMonth, returnEarlyWeekdays, returnLaterWeekdays, getWeekDates, getWeeksInMonth} from "../computations/date-computations.js";

const MonthsEnum = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

class Calendar extends Component{
    constructor(props){
        super(props);  
        
        this.API_URL = "http://localhost:5000/";
        this.state = {
          something: ""
        };  
        
        // just sketching
        this.width = 200;
        this.height = 200;
        this.nrOfWeeksDisplayed = 5;
        this.startingWeek = 0;
        this.endingWeek = 5;
        this.currentWeek = 2;


        this.dateNow = new Date();
        this.yearNow = this.dateNow.getFullYear();
        this.monthNow = this.dateNow.getMonth();
        this.dayNow =  this.dateNow.getDate();

        this.daysInMonth = new Date(this.yearNow, this.monthNow, 0).getDate();
        this.firstDayOfMonth = new Date(this.yearNow, this.monthNow - 1, 1).getDay();
        this.lastDayOfMonth = new Date(this.yearNow, this.monthNow - 1, this.daysInMonth).getDay();
        
        this.daysArray = []

        //add days from current month
        for (let i = 1; i <= this.daysInMonth; i++) {
          this.daysArray.push(i);
        }

        this.weeksArray = this.getWeeksArray(this.daysArray);

        this.allDaysInMonth = getAllDaysInMonth(this.monthNow, this.yearNow);

        this.earlyDays = returnEarlyWeekdays(this.allDaysInMonth[0]);

        this.laterDays = returnLaterWeekdays(this.allDaysInMonth[this.allDaysInMonth.length - 1]);

        
        this.weeksInCurrentMonth = getWeeksInMonth(2024,6);

    }

    getWeeksArray = (daysArray) => {
      const weeksArray = [];
      for (let i = 0; i < daysArray.length; i += 7) {
        weeksArray.push(daysArray.slice(i, i + 7));
      }
      return weeksArray;
    }  

    initializedRenderDate = () => {
      var currentDate = new Date(); 
      const abc = 123;
      
    }
    
    componentDidMount() {
      
    }

    calendarHeaderStyling = () => {
      return "font-family: ui-sans-serif m-5 space-x-1 font-medium"
    }

    calendarDateStyling = () => {
      return "text-center"
    }

  render() { 

        var headerStyle = this.calendarHeaderStyling();
        var calendarDateStyle = this.calendarDateStyling();

        var displayWeeks = []
        var displayWeekDays = []
        
        for (var i = this.weeksInCurrentMonth.firstWeek; i < this.weeksInCurrentMonth.firstWeek + 5; i++) {
          displayWeeks.push(i);
          displayWeekDays.push(getWeekDates(2024, i));
        }
      
        return (

          <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">  
            <h2 className="text-2xl font-bold text-gray-800 mb-4"> 
              {this.yearNow} - { MonthsEnum[this.monthNow] } - {this.dayNow} - {this.dateNow.toLocaleDateString('en-US', { weekday: 'long' })}
            </h2>

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
                        <td className="font-thin">{week}</td>
                        {
                          displayWeekDays[index].map((day, key) => {
                            return (
                              <td className={calendarDateStyle} key={key}> { day.date() } </td>
                          );})                    
                        }
                      </tr>
                    );

                  })
                  
                  }

                   
                  
                   
                  </tbody>
                </table>
              </div>

          </div>
              
          </div>        
        );
    }
}

export default Calendar;








