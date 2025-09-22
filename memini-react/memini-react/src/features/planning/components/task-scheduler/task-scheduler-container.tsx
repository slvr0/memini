import type { ITask } from "../../../tasks/interfaces/task-interface";
import DisplayTask from "../../../tasks/components/display-task"
import { Fragment, useState, useEffect, useRef, forwardRef } from "react";
import { Typography, Box, Grid } from "@mui/material";
import moment from "moment";
import { StatusColorProfileMap } from "../../../../mui-wrappers/mui-status-circle-wrapper";

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

    const timeNow = moment();
    const calculateTaskStatus = (task: ITask, timeNow: moment.Moment) : string => { 
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

    return ( 
      
            <div className={`grid grid-cols-[5%_19%_19%_19%_19%_19%] bg-white z-5 items-center text-center border-b border-b-gray-100 ${needsScroll ? '' : ''}`}                  
                    style={{ 
                        height: schedulerHeight,
                        maxHeight: needsScroll ? '80vh' : '100vh',       
                     }}>

                    <div className="flex flex-col justify-center h-full border-r border-r-gray-100 ">
                        {Array.from({ length: 24 }, (_, i) => (
                        <Box
                        key={`time-${i}`}
                        sx={{
                            height: timeslotHeight,                        
                            minHeight: timeslotHeight,
                            flex: 'none',    
                            display: 'flex',       
                            textAlign: 'center',   
                            justifyContent: 'center',   
                            pt: 1,
                        }}
                        >
                        <Typography
                        variant="subtitle2"
                        sx={{
                        color: 'text.secondary',
                        }}
                        >
                        {i.toString().padStart(2, '0')}:00
                        </Typography>
                        </Box>
                        ))}
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <DisplayTask hourPixel={schedulerHeight / 24} startTime={480} endTime={540} taskTitle="Project work" taskDescription="Focus time for project tasks and deep work."/>
                        <DisplayTask hourPixel={schedulerHeight / 24} startTime={800} endTime={1000} taskTitle="Emails and Communication" taskDescription="Review code submissions and provide feedback to 
                        team members.Review code submissions and provide feedback to team members.R
                        eview code submissions and provide feedback to team members.Review code submissions and provide feedback to team members.Review code submissions and provide feedback to team members."/>
                        
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <DisplayTask hourPixel={schedulerHeight / 24} startTime={600} endTime={800} taskTitle="Team Meeting" taskDescription="Weekly sync with the team to discuss progress and blockers."/>
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <DisplayTask hourPixel={schedulerHeight / 24} startTime={540} endTime={565} taskTitle="Design Review" taskDescription="Review design mockups and provide feedback."/>
                        <DisplayTask hourPixel={schedulerHeight / 24} startTime={840} endTime={900} taskTitle="Client Call" taskDescription="Discuss project requirements and feedback with the client."/>     
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <DisplayTask hourPixel={schedulerHeight / 24} startTime={700} endTime={800} taskTitle="Code Review" taskDescription="Review code submissions and provide feedback to 
                        team members.Review code submissions and provide feedback to team members.R
                        eview code submissions and provide feedback to team members.Review code submissions and provide feedback to team members.Review code submissions and provide feedback to team members."/> 
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <DisplayTask hourPixel={schedulerHeight / 24} startTime={600} endTime={1140} taskTitle="Planning Session" taskDescription="Plan upcoming sprints and allocate tasks to team members."/>
                    </div>


                </div>
    ) 
});

// Add display name for debugging
TaskSchedulerContainer.displayName = 'TaskSchedulerContainer';

export default TaskSchedulerContainer;