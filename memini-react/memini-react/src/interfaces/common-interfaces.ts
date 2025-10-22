export interface ICalendarDate {
  year: number;
  month: number; // 0-based (Jan = 0)
  day: number;
  week: number;
  weekDay: number;
}

export interface ISimpleDate {
    year: number;
    month: number; // 0-11    
    day: number; // 1-31
}

export interface ICalendarDateState {
  selectedDate: ICalendarDate;
  todaysDate: ICalendarDate;
}

export interface IUserSessionState {
  userSession: any | null; // replace 'any' with your session type
}

export interface IPositionState {
  Country: string;
  City: string;
  CountryCode?: string;
}