import type { Task } from "./task-types";
import { addUserTask, deleteUserTask, getUserTasks, saveUserTask } from "../../../services/usertask-service";
import { ApiResponse } from "../../../interfaces/api-response";

export async function fetchTasksForDate(data:any): Promise<ApiResponse<Task[]>> {
  return await getUserTasks(data).then(response => response.data).catch(e => console.log(e));
}

export async function fetchTasksForRange(startKey: string, endKey: string): Promise<Task[]> {
  // TODO
  return [];
}

export async function updateTaskApi(task: Task): Promise<ApiResponse<Task>> {
  console.log("updateTaskApi",task);
  return await saveUserTask(task).then(response => response.data).catch(e => console.log(e));
}

export async function addTaskApi(task: Task) : Promise<ApiResponse<Task>> {
  return await addUserTask(task).then(response => response.data).catch(e => console.log(e));
}

export async function deleteTaskApi(task: Task): Promise<ApiResponse<Task>> {
  return await deleteUserTask(task).then(response => response.data).catch(e => console.log(e));
}