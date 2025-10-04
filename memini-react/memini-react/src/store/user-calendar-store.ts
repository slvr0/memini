// user-calendar-store.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import {ICalendarDate, IUserSessionState, ICalendarDateState} from "../interfaces/common-interfaces"

// -------------------
// Types
// -------------------



// -------------------
// Utilities
// -------------------
const momentToObject = (date: moment.Moment): ICalendarDate => ({
  year: date.year(),
  month: date.month(),
  day: date.date(),
  week: date.isoWeek(),
  weekDay: date.weekday(),
});

// -------------------
// Initial States
// -------------------
const today = moment();

const calendarDateState: ICalendarDateState = {
  selectedDate: momentToObject(today),
  todaysDate: momentToObject(today),
};

const storedSession = localStorage.getItem('authToken');
const meminiUserState: IUserSessionState = {
  userSession: storedSession ? JSON.parse(storedSession) : null,
};

// -------------------
// Slices
// -------------------
export const calendarDateSlice = createSlice({
  name: 'calendarDate',
  initialState: calendarDateState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<{ newDate: ICalendarDate }>) {
      state.selectedDate = action.payload.newDate;
    },
    setSelectedYearMonth(state, action: PayloadAction<{ year: number; month: number }>) {
      state.selectedDate = {
        ...state.selectedDate,
        year: action.payload.year,
        month: action.payload.month,
      };
    },
  },
});

export const meminiUserSlice = createSlice({
  name: 'meminiUser',
  initialState: meminiUserState,
  reducers: {
    login: (state, action: PayloadAction<{ userSession: any }>) => {
      if (!state.userSession) {
        state.userSession = action.payload.userSession;
        localStorage.setItem('authToken', JSON.stringify(action.payload.userSession));
      }
    },
    logout: (state) => {
      state.userSession = null;
      localStorage.removeItem('authToken');
    },
  },
});

// -------------------
// Exports
// -------------------

export const calendarDateActions = calendarDateSlice.actions;
export const meminiUserActions = meminiUserSlice.actions;

export const calendarSlices = {
  calendarDate: calendarDateSlice.reducer,
  meminiUser: meminiUserSlice.reducer,
};
