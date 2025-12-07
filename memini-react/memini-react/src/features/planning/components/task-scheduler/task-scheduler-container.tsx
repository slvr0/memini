import TaskSchedulerTimemarkerDisplay from "./task-scheduler-timemarker-display"
import TaskSchedulerDailyContainer from "./task-scheduler-daily-container"
import TaskSchedulerHeader from "./task-scheduler-header"
import TaskSchedulerContentContainer from "./task-scheduler-content-container"
import TaskSchedulerContainerLoading from "./task-scheduler-container-loading"

import { useState, useEffect, useRef, forwardRef, Fragment, useMemo } from "react";

import { useTaskManager } from "../../../tasks/utils/task-manager"
import { getWeekDates } from "../../computes/task-scheduler-computations"

import { IDisplayTask, ITask } from "../../../tasks/interfaces/task-interface";
import {ICalendarDate} from "../../../../interfaces/common-interfaces"

import { getWeek } from 'date-fns';

import dayjs from "dayjs"
import { useActivityStore } from "../../../activity/store/activity-store"

interface TaskSchedulerContainerProps { 
    schedulerHeight: number;
    timeslotHeight: number;
}

//add a screen zoom listener to adjust overflow if user zooms in too much.
const TaskSchedulerContainer = forwardRef<HTMLDivElement, TaskSchedulerContainerProps>((props, ref) => {

    /*
        New structure
    */
    const [selectedWeek, setSelectedWeek] = useState<number>(getWeek(new Date()))
    const isValidSchedulerParentRef = (ref: React.RefObject<HTMLDivElement | null> ) =>  ref && typeof ref === 'object' && ref.current;  
    
    const loading = useActivityStore(state => state.loading);
    const error = useActivityStore(state => state.error);

    const weekdays : ICalendarDate[] = getWeekDates(2025, selectedWeek);

    // Convert weekdays to dayjs objects for filtering
    const weekdaysDayjs = useMemo(() => 
        weekdays.map(day => 
            dayjs().year(day.year).month(day.month).date(day.day)
        ), 
        [weekdays]
    );   

    /*
        Old structure remove 
    */   
    
    const {  fetchTasksForDateAndStore  } = useTaskManager();
       
    /* Load tasks */    
    const [weeklyTasks, setWeeklyTasks] = useState<Array<ITask[]>>([]);    


    useEffect(()  => {
        //new
    
        const fetchActivitiesForSelectedPeriod = async () => {
             useActivityStore.getState().loadActivitiesForDateRange(weekdaysDayjs[0], weekdaysDayjs[weekdaysDayjs.length - 1]);
            //await loadActivitiesForDateRange(weekdaysDayjs[0], weekdaysDayjs[weekdaysDayjs.length - 1]);
        }


        //old remove
        /* Fetches weekly tasks, dispatches them to update the store whilst setting the useState for weekly tasks */
        const fetchWeeklyTasksAndUpdateStore = async () => {           
            
            //replace this with a task manager effect that fetches a range of tasks and we get a response from that...
            const responseSuccess: Array<boolean> = await Promise.all(
                weekdays.map((weekday: ICalendarDate) => fetchTasksForDateAndStore(weekday.year, weekday.month, weekday.day).then(response => response?.Success || false))
            );


        };
        //fetchWeeklyTasksAndUpdateStore();

        //new
        fetchActivitiesForSelectedPeriod();
    }, [selectedWeek]);

    const handleDateSelectionChange = (selectedWeek: number) => setSelectedWeek(selectedWeek);
    
    return ( 
        <Fragment>
            {/* Should probably remove the content header and scaffold from container, it doesnt need re-render when tasks update.*/}
            <TaskSchedulerHeader 
                defaultValue={selectedWeek}
                onChange={(selectedWeek: number) => {
                    handleDateSelectionChange(selectedWeek)
                }}

                weekdaysDisplay={weekdays}
            />
            {loading ? (
                <TaskSchedulerContainerLoading />
            ) : (
                
                <TaskSchedulerContentContainer 
                    schedulerHeight={props.schedulerHeight} 
                    timeslotHeight={props.timeslotHeight} 
                    tasks={weeklyTasks} 
                    week={selectedWeek}
                    weekdays={weekdays}   
                  
                />
            )}
        </Fragment>
    ) 
});



export default TaskSchedulerContainer;