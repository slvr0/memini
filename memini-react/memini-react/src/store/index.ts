import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../components/task/store/task-slice";
import { calendarSlices  } from "./user-calendar-store";

// Add more reducers as you modularize
const store = configureStore({
  reducer: {
    ...calendarSlices,
    tasks: tasksReducer,
  },
});

// Inferred types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;