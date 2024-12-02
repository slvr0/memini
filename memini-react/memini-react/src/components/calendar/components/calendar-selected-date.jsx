import 'semantic-ui-css/semantic.min.css';
import {useSelector} from 'react-redux';
import {MonthsEnum, WeekDaysEnum} from '../computation/date-computations.js'

const  CalendarSelectedDate = (props) => {   
  const calendarDateState = useSelector((state) => state.calendarDate); 
  const weekDay = WeekDaysEnum[(calendarDateState.selectedDate.weekDay + 6) % 7]; 
  const selectDateClass = 'calendar-selected-date-container';
  return (
    <>  
      <div>
        <p className={selectDateClass}> 
          <span>{weekDay}, </span>
          <span>{MonthsEnum[calendarDateState.selectedDate.month - 1]} </span>
          <span>{calendarDateState.selectedDate.day} - </span>
          <span>{calendarDateState.selectedDate.year}</span>              
        </p> 
      </div>   

    </>
  );    
}

export default CalendarSelectedDate;








