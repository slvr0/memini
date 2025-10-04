// task-manager.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { userTasksActions } from "../../../features/tasks/store/task-slice";
import { toDateKey } from "./date-utils";
import type { DateKey, IDisplayTask, ITask } from "../interfaces/task-interface";
import { deleteTaskApi, fetchTasksForDate, updateTaskApi, addTaskApi } from "../../../features/tasks/store/task-api";
import { makeSelectTasksByDate, isDateLoaded } from "../../../features/tasks/store/task-selector";
import {  calculateTaskPixelTime } from "../../planning/computes/task-scheduler-computations"
import {ICalendarDate} from "../../../interfaces/common-interfaces"

import store from "../../../store/index";
import { ApiResponse } from "@/interfaces/api-response";

export const useTaskManager = () => {
  const dispatch: AppDispatch = useDispatch();

  const areDisplayTasksLoaded = (year: number, month: number, day: number): boolean => 
    isDateLoaded(toDateKey(year, month, day))(store.getState());

  const fetchTasksForDateAndStore = async (year: number, month: number, day: number) : Promise<ApiResponse<ITask[]>> =>  {      
    const response = await fetchTasksForDate({ year, month, day });
    
    if(!response)
      return response;

    const dateKey: DateKey = toDateKey(year, month, day);
    dispatch(userTasksActions.upsertTasks(response.ResponseObject as ITask[]));
    dispatch(userTasksActions.markDateLoaded(dateKey));

    return response;
  };

  const useTasksForDate = (year: number, month: number, day: number): ITask[] => {
    const dateKey: DateKey = toDateKey(year, month, day);
    return useSelector(makeSelectTasksByDate(dateKey));
  };

  const setSelectedTask = (task: ITask) : void => {
    if(task === null) 
      return;
    dispatch(userTasksActions.setSelectedTask(task));
  };

  const clearSelectedTask = () : void => {
    dispatch(userTasksActions.clearSelectedTask());
  }

  //inserts the task if not existing
  //TODO: in the future, we might want two inputs, task and updatedTask, and evaluate that the tasks on the affected dates are synced with db
  //else we trigger a render cycle

  //update existing data on task , returns the object in case server made changes
  const updateTask = async (task: Omit<ITask, 'UserKey'>) : Promise<ApiResponse<ITask>> =>  {
    const response = await updateTaskApi(task);

    if(response.Success) {
      dispatch(userTasksActions.updateTask(task));      
    }

    return response;    
  }

  const addTask = async (task: Omit<ITask, 'UserKey'>) : Promise<ApiResponse<ITask>> => {
    const response = await addTaskApi(task);

     if(response.Success) {
      dispatch(userTasksActions.addTask(response.ResponseObject));      
    }

    return response;  
  }

  const updateTaskFromDragEvent = (movedTask: IDisplayTask, dropDate: ICalendarDate, dropPosition: number, dropContainerHeight: number) => {
    const newStartTime = calculateTaskPixelTime(dropPosition, dropContainerHeight);

    const updatedTask : ITask = {...movedTask};
    updatedTask.Year = dropDate.year;
    updatedTask.Month = dropDate.month;
    updatedTask.Day = dropDate.day;

    const l = updatedTask.EndTime - updatedTask.StartTime;
    updatedTask.StartTime = newStartTime;
    updatedTask.EndTime = updatedTask.StartTime + l;

    if(updatedTask.UserTaskKey === 0)
      addTask(updatedTask)
    else 
      updateTask(updatedTask);      
  }
  
  const deleteTask = async (task: ITask) : Promise<void> => {
    if(task === null)
      return;

    const response = await deleteTaskApi(task);
    dispatch(userTasksActions.removeTask(task));
  }

  return { areDisplayTasksLoaded, fetchTasksForDateAndStore, useTasksForDate, setSelectedTask, clearSelectedTask, updateTask, updateTaskFromDragEvent, deleteTask, addTask };
};
