import CustomDropdown from '../../tools/custom-dropdown.jsx';
import {GetMonthsOptions, GetYearsOptions} from '../computation/date-computations.js';

const  CalendarNavigator = ({selectedMonth, onChangeSelectedMonth,selectedYear, onChangeSelectedYear, currentYear}) => { 
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
          <div className={navigationElements}>
            <i className="ui icon large chevron left memini-icon interactive calendar-navigation-chevron-left"
               onClick={() => {onChevronClick(selectedMonth, selectedYear, -1)}}
            ></i> 
            <CustomDropdown 
              options={monthsOptions}
              value={selectedMonth}
              onChange={onChangeSelectedMonth}
            ></CustomDropdown>
            <CustomDropdown 
              options={yearsOptions}
              value={selectedYear}
              onChange={onChangeSelectedYear}
            ></CustomDropdown>

            <i className="ui icon large chevron right memini-icon interactive calendar-navigation-chevron-right"
              onClick={() => {onChevronClick(selectedMonth, selectedYear, 1)}}
            ></i>
          </div>          
        </>
      );      
}

export default CalendarNavigator;








