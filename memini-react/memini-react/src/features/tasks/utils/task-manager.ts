// task-manager.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { userTasksActions } from "../../../features/tasks/store/task-slice";
import { toDateKey } from "./date-utils";
import type { DateKey, Task } from "../interfaces/task-types";
import { deleteTaskApi, fetchTasksForDate, updateTaskApi, addTaskApi } from "../../../features/tasks/store/task-api";
import { makeSelectTasksByDate, isDateLoaded } from "../../../features/tasks/store/task-selector";

import store from "../../../store/index";

export const useTaskManager = () => {
  const dispatch: AppDispatch = useDispatch();

  const areDisplayTasksLoaded = (year: number, month: number, day: number): boolean => {
   
    return isDateLoaded(toDateKey(year, month, day))(store.getState());
  };

  const fetchTasksForDateAndStore = async (year: number, month: number, day: number) => {
    
    const response = await fetchTasksForDate({ year, month, day });
 
    if(!response)
      return;

    const dateKey: DateKey = toDateKey(year, month, day);
    dispatch(userTasksActions.upsertTasks(response.ResponseObject as Task[]));
    dispatch(userTasksActions.markDateLoaded(dateKey));
  };

  const useTasksForDate = (year: number, month: number, day: number): Task[] => {
    const dateKey: DateKey = toDateKey(year, month, day);
    return useSelector(makeSelectTasksByDate(dateKey));
  };

  const setSelectedTask = (task: Task | null) : void => {
    if(task === null) 
      return;
    dispatch(userTasksActions.setSelectedTask(task as Task));
  };

  //inserts the task if not existing
  //TODO: in the future, we might want two inputs, task and updatedTask, and evaluate that the tasks on the affected dates are synced with db
  //else we trigger a render cycle

  // prev is the task before update.
  const updateTask = async (prev: Task | null, task: Task) : Promise<void> => {   
    //we dont have a task to update or we are comparing to a prev task state that has not changed. 
    if(task === null || (prev && (prev === task)))
      return;

    let updatedTask;

    if(task.UserTaskKey === 0) {
      updatedTask = (await addTaskApi(task)).ResponseObject;
      dispatch(userTasksActions.addTask(updatedTask)); 
    }      
    else  {
      updatedTask = (await updateTaskApi(task)).ResponseObject; 
      dispatch(userTasksActions.removeTask(prev));    
      dispatch(userTasksActions.addTask(updatedTask));      
    } 
  }

  const deleteTask = async (task: Task) : Promise<void> => {
    if(task === null)
      return;

    const response = await deleteTaskApi(task);
    dispatch(userTasksActions.removeTask(task));
  }

  return { areDisplayTasksLoaded, fetchTasksForDateAndStore, useTasksForDate, setSelectedTask, updateTask, deleteTask };
};
