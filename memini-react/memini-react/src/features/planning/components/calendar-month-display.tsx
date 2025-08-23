import { getWeekDates, getFirstWeekInMonth } from "../computes/date-computations";
import { useSelector, useDispatch } from 'react-redux';
import { calendarDateActions } from "../../../store/user-calendar-store";
import { RootState } from "../../../store/index";

const CalendarMonthDisplay = () => {  
  const dispatch          = useDispatch();
  const calendarDateState = useSelector((state : RootState) => state.calendarDate);  
  const selectedMonth = calendarDateState.selectedDate.month;
  const selectedYear = calendarDateState.selectedDate.year;

  const selectedMonthFirstWeek  = getFirstWeekInMonth(selectedMonth, selectedYear);

  const displayWeeks: number[]     = [];
  const displayWeekDays : moment.Moment[][] = [];
  
  for (var i = selectedMonthFirstWeek; i < selectedMonthFirstWeek + 6; i++) {
    displayWeeks.push(i <= 52 && i >= 1 ? i : Math.abs(52 - i));
    displayWeekDays.push(getWeekDates(selectedYear, i));
  }
  const currentWeekIsVisible = 
  calendarDateState.todaysDate.year === selectedYear && 
  calendarDateState.todaysDate.month === selectedMonth;

  const onChangeSelectedDate = (newDate: moment.Moment) => {
    const year    = newDate.year();  
    const month   = newDate.month(); 
    const day     = newDate.date(); 
    const week    = newDate.isoWeek();
    const weekDay = newDate.weekday();

    dispatch(calendarDateActions.setSelectedDate({newDate:{ year, month, day, week, weekDay}}));   
  }

  return (
        <>  
         <div className="w-full">
  {/* Header */}
  <div className="flex justify-between bg-gray-100 px-2 py-2 border-b text-sm font-semibold text-gray-700">
    <div className="w-12 text-center">Week</div>
    <div className="flex-1 grid grid-cols-7 gap-1 text-center">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
        <div key={i} className="weekday-header-text">{day}</div>
      ))}
    </div>
  </div>

  {/* Body */}
  <div className="flex flex-col">
    {displayWeeks.map((week, index) => {
      const isCurrentWeek = currentWeekIsVisible && calendarDateState.todaysDate.week === week;
      return (
        <div
          key={index}
          className={`flex items-center px-2 py-1 border-b ${isCurrentWeek ? 'bg-gray-100' : ''}`}
        >
          <div className="w-12 text-center font-medium text-sm text-gray-600">{week}</div>

          <div className="flex-1 grid grid-cols-7 gap-1">
            {displayWeekDays[index].map((day, key) => {
              const isSelectedDay =
                calendarDateState.selectedDate.week === week &&
                ((calendarDateState.selectedDate.weekDay + 6) % 7) === key;

              return (
                <button
                  key={`${index}-${key}`}
                  className={`text-sm py-1 rounded text-center transition-all ${
                    isSelectedDay
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'hover:bg-blue-100 text-gray-700'
                  }`}
                  onClick={() => onChangeSelectedDate(day)}
                >
                  {day.date()}
                </button>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
</div>
             
        </>       
      );      
}

export default CalendarMonthDisplay;








