import type { Task } from "../interfaces/task-types";
import type { ApiResponse } from "../../../interfaces/api-response";

import { addUserTask, deleteUserTask, getUserTasks, saveUserTask } from "../../../services/usertask-service";

export async function fetchTasksForDate(data:any): Promise<ApiResponse<Task[]>> {
  return await getUserTasks(data).then(response => response.data).catch(e => console.log(e));
}

export async function fetchTasksForRange(startKey: string, endKey: string): Promise<Task[]> {
  // TODO
  return [];
}

export async function updateTaskApi(task: Task | Omit<Task, 'UserKey'>): Promise<ApiResponse<Task>> { 
  return await saveUserTask(task).then(response => response.data).catch(e => console.log(e));
}

export async function addTaskApi(task: Task | Omit<Task, 'UserKey'>) : Promise<ApiResponse<Task>> {
  return await addUserTask(task).then(response => response.data).catch(e => console.log(e));
}

export async function deleteTaskApi(task: Task | Omit<Task, 'UserKey'>): Promise<ApiResponse<Task>> {
  return await deleteUserTask(task).then(response => response.data).catch(e => console.log(e));
}