import { createSlice, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import type { ITask, IDisplayTask, DateKey, TaskId } from "../interfaces/task-interface";
import { toDateKey } from "../utils/date-utils";
import { endsWith } from "lodash";

export const tasksAdapter = createEntityAdapter<ITask, number>({
  selectId: (task) => task.UserTaskKey,
});

type TasksState = ReturnType<typeof tasksAdapter.getInitialState> & {
  byDate: Record<DateKey, TaskId[]>;
  loadedDates: Record<DateKey, boolean>;
  loading: boolean;
  selectedTask: ITask | null;
};

const initialState: TasksState = tasksAdapter.getInitialState({
  byDate: {},
  loadedDates: {},
  loading: false,
  selectedTask: null
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    upsertTasks(state, action: PayloadAction<ITask[]>) { 
      tasksAdapter.upsertMany(state, action.payload);
      for (const task of action.payload) {
        const key = toDateKey(task.Year, task.Month, task.Day);
        if (!state.byDate[key]) state.byDate[key] = [];
        if (!state.byDate[key].includes(task.UserTaskKey)) {
          state.byDate[key].push(task.UserTaskKey);
        }
      }
    },
    setSelectedTask(state, action: PayloadAction<ITask>) {
      state.selectedTask = action.payload as ITask;
    },
    clearSelectedTask(state, action: PayloadAction<void>) {
      state.selectedTask = null;
    },
    deleteTask(state, action: PayloadAction<TaskId>) {
      const id = action.payload;
      tasksAdapter.removeOne(state, id);

      for (const key of Object.keys(state.byDate)) {
        state.byDate[key] = state.byDate[key].filter((tid) => tid !== id);
      }
    },

    updateTask(state, action) {
      const oldTask = state.entities[action.payload.UserTaskKey];
      const newTask = action.payload;
      tasksAdapter.upsertOne(state, newTask);

      //update the byDate
      const oldDateKey = toDateKey(oldTask.Year, oldTask.Month, oldTask.Day);
      const newDateKey = toDateKey(newTask.Year, newTask.Month, newTask.Day);

      if(newDateKey === oldDateKey)
        return;

      //update dateKeys, old one
      const idsOldDate = state.byDate[oldDateKey] ?? []
      state.byDate[oldDateKey] = idsOldDate.filter(id => id !== oldTask.UserTaskKey);

      //update dateKeys, new one
  
      if (!state.byDate[newDateKey]) state.byDate[newDateKey] = [];
      if (!state.byDate[newDateKey].includes(newTask.UserTaskKey)) {
        state.byDate[newDateKey].push(newTask.UserTaskKey);
      }
    },

    addTask(state, action) {
      const task = action.payload;
      const dateKey = toDateKey(task.Year, task.Month, task.Day);
      tasksAdapter.upsertOne(state, task);

      const ids = state.byDate[dateKey] ?? [];

      if (!ids.includes(task.UserTaskKey)) {
        ids.push(task.UserTaskKey);
        state.byDate[dateKey] = ids;
      }
    },

    removeTask(state, action) {
      const task = action.payload;
      const dateKey = toDateKey(task.Year, task.Month, task.Day);
      tasksAdapter.removeOne(state, task.UserTaskKey);
      
      const ids = state.byDate[dateKey] ?? []
      state.byDate[dateKey] = ids.filter(id => id !== task.UserTaskKey);
    },

    clearTasks(state) {
      tasksAdapter.removeAll(state);
      state.byDate = {};
      state.loadedDates = {};
    },

    markDateLoaded(state, action: PayloadAction<DateKey>) {
      state.loadedDates[action.payload] = true;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }    
  },
});


export const userTasksActions =  tasksSlice.actions;

export default tasksSlice.reducer;


