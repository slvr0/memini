import TaskSchedulerTimemarkerDisplay from "./task-scheduler-timemarker-display"
import TaskDailyContainer from "./task-daily-container"
import DisplayTask from "../../../tasks/components/display-task"
import { Fragment, useState, useEffect, useRef, forwardRef } from "react";
import { mockedTasks } from "./mocked-task"



interface TaskSchedulerContainerProps {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    displayAsWeek?: boolean;
    schedulerHeight: number;
    timeslotHeight: number;
}

//add a screen zoom listener to adjust overflow if user zooms in too much.
const TaskSchedulerContainer = forwardRef<HTMLDivElement, TaskSchedulerContainerProps>((props, ref) => {
    const schedulerHeight = props.schedulerHeight;
    const timeslotHeight = props.timeslotHeight;   
    
    const [needsScroll, setNeedsScroll] = useState(false);

    const isValidSchedulerParentRef = (ref: React.RefObject<HTMLDivElement | null> ) =>  ref && typeof ref === 'object' && ref.current;
    const getRefBoundingRect = (ref: React.RefObject<HTMLDivElement | null>) => isValidSchedulerParentRef(ref) ? ref?.current?.getBoundingClientRect() : null;  
    const updateSchedulerScrollVisibility = () => {            
            setNeedsScroll(schedulerHeight >= getRefBoundingRect(ref as React.RefObject<HTMLDivElement>)?.height!);
        };

    useEffect(() => {
        if(!isValidSchedulerParentRef(ref as React.RefObject<HTMLDivElement>)) return;        

        updateSchedulerScrollVisibility();        
        window.addEventListener('resize', updateSchedulerScrollVisibility); 
        return () => window.removeEventListener('resize', updateSchedulerScrollVisibility);
    }, []);

    const createdTasks = mockedTasks;
    const amountOfTasksPerDay = createdTasks.length / 5;
    const amountOfTasksPerDayTest = 6;
    return (       
            <div className={`grid grid-cols-[5%_19%_19%_19%_19%_19%] bg-white z-5 items-center text-center border-b border-b-gray-100 ${needsScroll ? '' : ''}`}                  
                    style={{ 
                        height: schedulerHeight,
                        maxHeight: needsScroll ? '80vh' : '100vh',       
                     }}>

                    <TaskSchedulerTimemarkerDisplay 
                        timeslotHeight={timeslotHeight}
                        typographyVariant='subtitle2'
                    />

                    {  /* Loop the weekdays, daysweek */
                     /*Array.from({length: 5}, (_, i) => {
                        return (<TaskDailyContainer containerIndex={i} containerHeight={schedulerHeight} 
                            displayTasks={createdTasks.slice(i * amountOfTasksPerDay, (i * amountOfTasksPerDay) + amountOfTasksPerDay)}/>);
                    })*/
                    } 

                    { /* Loop the weekdays, daysweek */
                    Array.from({length: 1}, (_, i) => {
                        return (<TaskDailyContainer containerIndex={i} containerHeight={schedulerHeight} simulatedSlotSpan={3} 
                            displayTasks={createdTasks.slice(i * amountOfTasksPerDayTest, (i * amountOfTasksPerDayTest) + amountOfTasksPerDayTest)}/>);
                    })
                    } 
                   
                    { /* Loop the weekdays, daysweek */
                    Array.from({length: 1}, (_, i ) => {
                        return (<TaskDailyContainer containerIndex={i} containerHeight={schedulerHeight}  simulatedSlotSpan={2} 
                            displayTasks={createdTasks.slice((i + 1) * amountOfTasksPerDayTest, ((i + 1) * amountOfTasksPerDayTest) + amountOfTasksPerDayTest)}/>);
                    })
                    }

                    { /* Loop the weekdays, daysweek */
                    Array.from({length: 1}, (_, i ) => {
                        return (<TaskDailyContainer containerIndex={i} containerHeight={schedulerHeight}  simulatedSlotSpan={1} 
                            displayTasks={createdTasks.slice((i + 2) * amountOfTasksPerDayTest, ((i + 2) * amountOfTasksPerDayTest) + amountOfTasksPerDayTest)}/>);
                    })
                    }


                </div>
    ) 
});

// Add display name for debugging ???
TaskSchedulerContainer.displayName = 'TaskSchedulerContainer';

export default TaskSchedulerContainer;