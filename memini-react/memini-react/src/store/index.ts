import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/store/task-slice";
import { calendarSlices  } from "./user-calendar-store";
import { positionSlice } from "./position-store";
// Add more reducers as you modularize
const store = configureStore({
  reducer: {    
    ...calendarSlices,
    tasks: tasksReducer,
    location: positionSlice.reducer,
  },
});

// Inferred types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;