import moment from 'moment';

Date.prototype.getWeek = function() {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const date = this.getDate();
    const januaryFirst = new Date(year, 0, 1);
    const offset = januaryFirst.getDay() === 0 ? 1 : januaryFirst.getDay();
    const daysSinceYearStart = ((month - 1) * 30) + date + offset - 1;
    const weekNo = Math.ceil(daysSinceYearStart / 7);
    return weekNo;
};

// i can reduce this to first week then % on the day enumeration
const getWeeksInMonth = (year, month) => {

    const firstDateOfMonth = new Date(year, month - 1, 1);
    const lastDateOfMonth = new Date(year, month, 0); 
   
    const firstWeek = firstDateOfMonth.getWeek();
    const lastWeek = lastDateOfMonth.getWeek();    

    return { firstWeek, lastWeek };
};

//i did this is the function
const getFirstWeekInMonth = (year, month) => {
    return new Date(year, month - 1, 1).getWeek();
}

const getWeekDates = (year, week) => {
    var weekDates = []; 

    const firstDayOfYear = moment(year, "YYYY").startOf('year');
    const firstDayOfWeek = firstDayOfYear.clone().week(week).startOf('isoWeek'); // Start of ISO week (Monday)

    for (var i = 0; i < 7; i++) {
      weekDates.push(firstDayOfWeek.clone().add(i, 'days')); 
    }

    return weekDates; 
};


//is today part of current visible weekspan, if yes returns active week and active day index
const evaluateTodayIsPartOfWeekspan = (today, weeks, year) => {
    const weekOfYear = Math.floor((today - new Date(year, 0, 1)) / 604800000) + 1;
  
    if (weeks.includes(weekOfYear)) {
      return { isInWeek: true, weekIndex: weeks.indexOf(weekOfYear) };
    } else {
      return { isInWeek: false, weekIndex: -1 };
    }
}

export { getWeeksInMonth, getWeekDates, getFirstWeekInMonth, evaluateTodayIsPartOfWeekspan  };