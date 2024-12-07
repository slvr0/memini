import {getWeekDates, getFirstWeekInMonth} from "../computation/date-computations.js";
import {useSelector, useDispatch} from 'react-redux';
import { calendarDateActions } from "../../../redux-memini-store.js";

const CalendarMonthDisplay = ({selectedMonth, selectedYear}) => {
  const dispatch          = useDispatch();
  const calendarDateState = useSelector((state) => state.calendarDate);  
  const selectedMonthFirstWeek  = getFirstWeekInMonth(selectedMonth, selectedYear);

  const displayWeeks    = [];
  const displayWeekDays = [];
  
  for (var i = selectedMonthFirstWeek; i < selectedMonthFirstWeek + 6; i++) {
    displayWeeks.push(i <= 52 && i >= 1 ? i : Math.abs(52 - i));
    displayWeekDays.push(getWeekDates(selectedYear, i));
  }
  const currentWeekIsVisible = 
  calendarDateState.todaysDate.year === selectedYear && 
  calendarDateState.todaysDate.month === selectedMonth;

  const onChangeSelectedDate = (newDate) => {
    const year    = newDate.year();  
    const month   = newDate.month() + 1; 
    const day     = newDate.date(); 
    const week    = newDate.isoWeek();
    const weekDay = newDate.weekday();

    dispatch(calendarDateActions.setSelectedDate({newDate:{ year, month, day, week, weekDay}}));   
  }

  return (
        <>  
          <table className="w-full">
                  <thead >
                    <tr>
                      <th className="weekday-header-text">Week</th>
                      <th className="weekday-header-text">Mon</th>
                      <th className="weekday-header-text">Tue</th>
                      <th className="weekday-header-text">Wed</th>
                      <th className="weekday-header-text">Thu</th>
                      <th className="weekday-header-text">Fri</th>
                      <th className="weekday-header-text">Sat</th>
                      <th className="weekday-header-text">Sun</th>
                    </tr>
                  </thead>

                  <tbody >                
                  {                   
                    displayWeeks.map((week, index) => {
                      return (
                        <tr key={index} className={currentWeekIsVisible && calendarDateState.todaysDate.week === week ? 'memini-background-dimmed' : ''}>
                          <td className="calendar-display-date">{week}</td>
                          {
                            displayWeekDays[index].map((day, key) => {
                              const isSelectedDay = calendarDateState.selectedDate.week === week && (((calendarDateState.selectedDate.weekDay + 6) % 7) === key);
                                 
                              const uniqueKey = `${index}-${key}`;
                              return (
                                <td className='calendar-display-date'                                
                                  key={uniqueKey}
                                  onClick={ () => {onChangeSelectedDate(day)}}
                                >                                
                                <span className={`${isSelectedDay ? 'calendar-display-selected-day' : 'calendar-display-date'}`}>
                                { day.date() }
                                </span> </td>
                              );
                            })                    
                          }
                        </tr>
                      );
                    })                  
                  }                  
                  
                  </tbody>
                  
                </table>                
        </>       
      );      
}

export default CalendarMonthDisplay;








