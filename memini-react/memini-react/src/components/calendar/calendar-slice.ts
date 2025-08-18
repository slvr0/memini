// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CalendarDate {
//   year: number;
//   month: number; // 1–12
//   day: number;   // 1–31
// }

// const initialState: { selectedDate: CalendarDate } = {
//   selectedDate: { year: 2025, month: 8, day: 16 },
// };

// const calendarSlice = createSlice({
//   name: "calendar",
//   initialState,
//   reducers: {
//     setSelectedDate(state, action: PayloadAction<CalendarDate>) {
//       state.selectedDate = action.payload;
//     },
//   },
// });

// export const calendarReducer = calendarSlice.reducer;
// export const calendarActions = calendarSlice.actions;