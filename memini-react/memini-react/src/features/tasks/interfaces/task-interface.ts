import MuiStyledStatusCircle , { StatusType } from "../../../mui-wrappers/mui-status-circle-wrapper"
import MaterialUITheme1Profile from '../../../styling/mui_theme_1/theme-profile';


export interface ITask {
  UserTaskKey: TaskId;

  Title: string;
  Description?: string;
  Year: number;
  Month: number; // 1–12
  Day: number; 
  StartTime: number;
  EndTime: number;
}

export type TaskId = number;

export type DateKey = string;

export interface TaskLayoutProps {
    taskTitle: string;
    taskDescription?: string; 
    displayTime? : string;
}

export interface TaskLayoutOptionPanelProps {
  borderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  iconSize?: number;
  iconOpacity?: number;  
}

//Interface Task for Display with calculated metrix and slot information.
export interface IDisplayTask extends Omit<ITask, 'UserKey'> {    
    height?:number;
    yPosition?:number;
    slotIndex: number; // horizontal alignment
    slotSpan?: number  // can take up multiple index space
    slotCount: number; // horizontal alignment
}

export interface IStoredUserTask {
  StoredUserTaskKey: TaskId;
  Title: string;
  Description?: string;
  Duration?: number;
  Created?: string; 
}

export interface IStoredUserTaskResponse {
  Favorites : IStoredUserTask[];
  Recent : IStoredUserTask[];
}

