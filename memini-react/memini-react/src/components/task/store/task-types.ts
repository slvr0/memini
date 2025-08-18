export type TaskId = number;

export interface Task {
  UserTaskKey: TaskId;
  UserKey: number;
  Title: string;
  Description?: string;
  Year: number;
  Month: number; // 1–12
  Day: number; 
  StartTime: number;
  EndTime: number;
}

export type DateKey = string; // "YYYY-MM-DD"

export interface UpdateTaskPayloadAction {
  oldTask: Task;
  newTask: Task;
}
