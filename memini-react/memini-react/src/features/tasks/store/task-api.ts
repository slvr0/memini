import type { ITask } from "../interfaces/task-interface";
import type { ApiResponse } from "../../../interfaces/api-response";

import { addUserTask, deleteUserTask, getUserTasks, saveUserTask } from "../../../services/usertask-service";

export async function fetchTasksForDate(data:any): Promise<ApiResponse<ITask[]>> {
  return await getUserTasks(data).then(response => response.data).catch(e => console.log(e));
}

export async function fetchTasksForRange(startKey: string, endKey: string): Promise<ITask[]> {
  // TODO
  return [];
}

export async function updateTaskApi(task: ITask | Omit<ITask, 'UserKey'>): Promise<ApiResponse<ITask>> { 
  return await saveUserTask(task).then(response => response.data).catch(e => console.log(e));
}

export async function addTaskApi(task: ITask | Omit<ITask, 'UserKey'>) : Promise<ApiResponse<ITask>> {
  return await addUserTask(task).then(response => response.data).catch(e => console.log(e));
}

export async function deleteTaskApi(task: ITask | Omit<ITask, 'UserKey'>): Promise<ApiResponse<ITask>> {
  return await deleteUserTask(task).then(response => response.data).catch(e => console.log(e));
}