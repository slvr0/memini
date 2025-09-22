import MUI_StyledStatusCircle , { StatusType } from "../../../mui-wrappers/mui-status-circle-wrapper"
import MaterialUITheme1Profile from '../../../styling/mui_theme_1/theme-profile';

export interface ITask {
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

export type TaskId = number;

export type DateKey = string;

export interface UpdateTaskPayloadAction {
  oldTask: ITask;
  newTask: ITask;
}

//this should extend ITask?
export interface DisplayTaskProps {
    hourPixel:number;
    startTime: number;
    endTime: number;   
    taskTitle: string;
    taskDescription?: string;
    status?: StatusType;
    slotIndex?: number; // horizontal alignment
    slotCount?: number; // horizontal alignment
}

export interface TaskLayoutProps {
    taskTitle: string;
    taskDescription?: string;
    status?: StatusType; 
}

export interface TaskLayoutOptionPanelProps {
  borderProfile?: keyof typeof MaterialUITheme1Profile.borderProfiles;
  iconSize?: number;
  iconOpacity?: number;
  showEdit?: boolean;
  showDelete?: boolean;
  showStar?: boolean;
  showShare?: boolean;
  onEditClick?: (e: any) => void;
  onDeleteClick?: (e: any) => void;
  onStarClick?: (e: any) => void;
  onShareClick?: (e: any) => void;
}


