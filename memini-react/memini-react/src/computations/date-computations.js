import moment from 'moment';

const getAllDaysInMonth = (month, year) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );

const returnEarlyWeekdays = (date) => {
    const dayOfWeek = date.getDay(); // Get the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const daysInWeek = 7;
    const startOfWeek = new Date(date); // Clone the given date to avoid mutating the original
    startOfWeek.setDate(date.getDate() - (dayOfWeek === 0 ? daysInWeek - 1 : dayOfWeek - 1)); // Set to the previous Monday

    const result = [];
    for (let i = 0; i < (dayOfWeek === 0 ? daysInWeek - 2 : dayOfWeek - 1); i++) {
        const tempDate = new Date(startOfWeek);
        tempDate.setDate(startOfWeek.getDate() + i);
        result.push(tempDate);
    }
    return result;
};

const returnLaterWeekdays = (date) => {
    const dayOfWeek = date.getDay(); // Get the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const daysInWeek = 7;
    const endOfWeek = new Date(date); // Clone the given date to avoid mutating the original
    endOfWeek.setDate(date.getDate() + (dayOfWeek === 0 ? 1 : daysInWeek - dayOfWeek)); // Set to the next Sunday

    const result = [];
    for (let i = 1; i <= (dayOfWeek === 0 ? 1 : daysInWeek - dayOfWeek); i++) { // Adjusted loop condition
        const tempDate = new Date(date);
        tempDate.setDate(date.getDate() + i);
        result.push(tempDate);
    }
    return result;
};

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    var yearStart = new Date(date.getFullYear(), 0, 1);
    var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return weekNo;
};

// i can reduce this to first week then % on the day enumration
const getWeeksInMonth = (year, month) => {
    // Get the first and last dates of the month
    const firstDateOfMonth = new Date(year, month - 1, 1);
    const lastDateOfMonth = new Date(year, month, 0); // Setting day to 0 gives the last day of the previous month

    // Determine the week numbers for these dates
    const firstWeek = firstDateOfMonth.getWeek();
    const lastWeek = lastDateOfMonth.getWeek();

    return { firstWeek, lastWeek };
};

const getWeekDates = (year, week) => {
    var weekDates = []; 

    const firstDayOfYear = moment(year, "YYYY").startOf('year');
    const firstDayOfWeek = firstDayOfYear.clone().week(week).startOf('isoWeek'); // Start of ISO week (Monday)

    for (var i = 0; i < 7; i++) {
      weekDates.push(firstDayOfWeek.clone().add(i, 'days')); 
    }

    return weekDates; 
};
  



export { getAllDaysInMonth, returnEarlyWeekdays, returnLaterWeekdays, getWeeksInMonth, getWeekDates  };