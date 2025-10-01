import TaskSchedulerTimemarkerDisplay from "./task-scheduler-timemarker-display"
import TaskSchedulerDailyContainer from "./task-scheduler-daily-container"
import TaskSchedulerHeader from "./task-scheduler-header"
import TaskSchedulerContentContainer from "./task-scheduler-content-container"
import TaskSchedulerContainerLoading from "./task-scheduler-container-loading"

import { useState, useEffect, useRef, forwardRef, Fragment } from "react";

import { useTaskManager } from "../../../tasks/utils/task-manager"
import { getWeekDates } from "../../computes/task-scheduler-computations"

import { IDisplayTask, ITask } from "../../../tasks/interfaces/task-interface";

interface TaskSchedulerContainerProps { 
    schedulerHeight: number;
    timeslotHeight: number;
}

//add a screen zoom listener to adjust overflow if user zooms in too much.
const TaskSchedulerContainer = forwardRef<HTMLDivElement, TaskSchedulerContainerProps>((props, ref) => {
    //managed dispatch / endpoint / redux and updating of tasks 
    const { areDisplayTasksLoaded, fetchTasksForDateAndStore, useTasksForDate, setSelectedTask, clearSelectedTask, updateTask, deleteTask } = useTaskManager();
    const isValidSchedulerParentRef = (ref: React.RefObject<HTMLDivElement | null> ) =>  ref && typeof ref === 'object' && ref.current;  
    const currentWeek = 39; //react on schedulerHeader inputs
    const weekdays : ICalendarDate[] = getWeekDates(2025, currentWeek);
   
    /* Load tasks */    
    const [weeklyTasks, setWeeklyTasks] = useState<Array<ITask[]>>([]);    
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()  => {
        /* Fetches weekly tasks, dispatches them to update the store whilst setting the useState for weekly tasks */
        const fetchWeeklyTasksAndUpdateStore = async () => {           
            
            //replace this with a task manager effect that fetches a range of tasks and we get a response from that...
            const responseSuccess: Array<boolean> = await Promise.all(
                weekdays.map((weekday: ICalendarDate) => fetchTasksForDateAndStore(weekday.year, weekday.month + 1, weekday.day).then(response => response?.Success || false))
            );

            setIsLoading(responseSuccess.some((responseStatus: boolean) => responseStatus === false));
        };
        fetchWeeklyTasksAndUpdateStore();
    }, []);

    const handleDateSelectionChange = (selectedWeek: number) => {   
        console.log("handleDateSelectionChange");
    }
 

    return ( 
        <Fragment>
            {/* Should probably remove the content header and scaffold from container, it doesnt need re-render when tasks update.*/}
            <TaskSchedulerHeader 
                defaultValue={currentWeek} 
                onChange={(selectedWeek: number) => {handleDateSelectionChange(selectedWeek)}}
            />
            {isLoading ? (
                <TaskSchedulerContainerLoading />
            ) : (
                <TaskSchedulerContentContainer 
                    schedulerHeight={props.schedulerHeight} 
                    timeslotHeight={props.timeslotHeight} 
                    tasks={weeklyTasks} 
                    week={currentWeek}
                    weekdays={weekdays}        
                />
            )}
        </Fragment>
    ) 
});



export default TaskSchedulerContainer;