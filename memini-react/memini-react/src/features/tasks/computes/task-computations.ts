    
import moment from "moment";
import type { ITask } from "../../tasks/interfaces/task-interface";
import { StatusColorProfileMap } from "../../../mui-wrappers/mui-status-circle-wrapper";
    
/*Calculates the Task status on an ITask relative to the current time, returns the color profile map (maps to the palette) as status is presented with a colored circle. */
export const calculateTaskStatus = (task: ITask, timeNow: moment.Moment =  moment()) : string => { 

    var taskAsMoment: moment.Moment = moment({
        year: task.Year,
        month: task.Month,
        day: task.Day,
        hour: Math.floor(task.StartTime / 100), 
        minute: task.StartTime % 100
    });

    if(taskAsMoment.isBefore(timeNow))
        return StatusColorProfileMap.PASSED;

    if(taskAsMoment.isSame(timeNow, 'day'))
        return StatusColorProfileMap.UPCOMING;

    return StatusColorProfileMap.FUTURE; 
}