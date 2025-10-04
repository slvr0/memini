import moment from 'moment';

declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function (): number {
  const year = this.getFullYear();
  const month = this.getMonth() + 1;
  const date = this.getDate();
  const januaryFirst = new Date(year, 0, 1);
  const offset = januaryFirst.getDay() === 0 ? 1 : januaryFirst.getDay();

  const daysSinceYearStart =
    Math.floor(
      (this.getTime() - januaryFirst.getTime()) / (24 * 60 * 60 * 1000)
    ) + 1;

  const weekNo = Math.ceil((daysSinceYearStart + offset - 1) / 7);
  return weekNo;
};

// i can reduce this to first week then % on the day enumeration
const getWeeksInMonth = (year: number, month: number) => {

    const firstDateOfMonth = new Date(year, month , 1);
    const lastDateOfMonth = new Date(year, month, 0); 
   
    const firstWeek = firstDateOfMonth.getWeek();
    const lastWeek = lastDateOfMonth.getWeek();    

    return { firstWeek, lastWeek };
};

//i did this is the function
const getFirstWeekInMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getWeek();
}

const getWeekDates = (year: number, week: number) : moment.Moment[] =>  {
    var weekDates = []; 

    const firstDayOfYear = moment(year, "YYYY").startOf('year');
    const firstDayOfWeek = firstDayOfYear.clone().week(week).startOf('isoWeek'); // Start of ISO week (Monday)

    for (var i = 0; i < 7; i++) {
      weekDates.push(firstDayOfWeek.clone().add(i, 'days')); 
    }

    return weekDates; 
};

const generateHalfHourIntervals = (startHour: number, endHour: number) => {
    const intervals = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      intervals.push(`${hour}:00`);
      intervals.push(`${hour}:30`);
    }
    return intervals;
  };

const GetMonthsOptions = () => {
  return [
    { key: '1', value: 'January' },
    { key: '2', value: 'February' },
    { key: '3', value: 'March' },
    { key: '4', value: 'April' },
    { key: '5', value: 'May' },
    { key: '6', value: 'June' },
    { key: '7', value: 'July' },
    { key: '8', value: 'August' },
    { key: '9', value: 'September' },
    { key: '10', value: 'October' },
    { key: '11', value: 'November' },
    { key: '12', value: 'December' },
  ]; 
}

const GetYearsOptions = (currentYear: number, interval: number) => {
  const yearsOptions = [];
  for (let year = currentYear - interval; year <= currentYear + interval; year++) {
    yearsOptions.push({ key: year, value: year });
  }
  return yearsOptions;
}

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

const WeekDaysEnum = [
  'Sunday',
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',  
] as const;

export { getWeeksInMonth, getWeekDates, getFirstWeekInMonth, 
  generateHalfHourIntervals, MonthsEnum, WeekDaysEnum, GetMonthsOptions, GetYearsOptions };