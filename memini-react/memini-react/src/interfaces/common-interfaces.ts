interface ICalendarDate {
  year: number;
  month: number; // 0-based (Jan = 0)
  day: number;
  week: number;
  weekDay: number;
}

interface ICalendarDateState {
  selectedDate: ICalendarDate;
  todaysDate: ICalendarDate;
}

interface IUserSessionState {
  userSession: any | null; // replace 'any' with your session type
}