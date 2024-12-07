import CustomDropdown from '../../tools/custom-dropdown.jsx';
import {GetMonthsOptions, GetYearsOptions} from '../computation/date-computations.js';

const  CalendarNavigator = ({selectedMonth, onChangeSelectedMonth,selectedYear, onChangeSelectedYear, currentYear, onClickSelectToday}) => { 
  
  const monthsOptions      = GetMonthsOptions();
  const yearsOptions       = GetYearsOptions(currentYear, 10);
  const navigationElements = 'calendar-navigation-elements';
  const isInMonthInterval  = (month) => month > 0 && month < 13;

  const onChevronClick = (currentMonth, currentYear, increment) => {
    const newMonth = currentMonth + increment;    
    const isNewMonthInInterval = isInMonthInterval(newMonth);
    if(isNewMonthInInterval) onChangeSelectedMonth(newMonth);
    else {
      onChangeSelectedMonth(Math.abs(12 - newMonth));
      onChangeSelectedYear(currentYear + increment);
    }
  }
 

  return( 
        <>  
          <div className={`sixteen wide column ${navigationElements}`}>
              <i className="ui icon calendar outline check memini-icon interactive calendar-navigation-select-today"
                    onClick={() => {onClickSelectToday()}}
              ></i>

              <i className="ui icon large chevron left memini-icon interactive calendar-navigation-chevron-left"
                onClick={() => {onChevronClick(selectedMonth, selectedYear, -1)}}
              ></i> 
              <CustomDropdown 
                options={monthsOptions}
                value={selectedMonth}
                onChange={onChangeSelectedMonth}
                className={'calendar-navigation-dropdown'}
              ></CustomDropdown>
              <CustomDropdown 
                options={yearsOptions}
                value={selectedYear}
                onChange={onChangeSelectedYear}
                className={'calendar-navigation-dropdown'}
              ></CustomDropdown>

              <i className="ui icon large chevron right memini-icon interactive calendar-navigation-chevron-right"
                onClick={() => {onChevronClick(selectedMonth, selectedYear, 1)}}
              ></i>
          </div>        
        
        </>
      );      
}

export default CalendarNavigator;








