import { Fragment, useState, useEffect, useRef, forwardRef } from "react";

import { SxProps } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/images/memini-png.png";

import { useDispatch, useSelector } from 'react-redux';

import CabinTwoToneIcon from '@mui/icons-material/CabinTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import MuiWrapperPaper from "../../../general/components/mui-wrapper-paper";
import Tooltip from '@mui/material/Tooltip';
import { RootState } from "../../../../store";
import { Hub } from '@mui/icons-material';
import { Link } from '@mui/icons-material';
import MUI_StyledButton from "../../../../mui/mui-button-wrapper";
import MUI_StyledSegment from "../../../../mui/mui-segment-wrapper"
import LucidIconButton from "../../../../lucid/lucid-button-icon"
import { Typography, Box, Grid } from "@mui/material";
import { ConnectWithoutContact } from '@mui/icons-material';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';

import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { House, Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText, CalendarSync, CakeSlice, Contact, MessageSquare, NotebookPen } from "lucide-react";
import Task from "./task";
import moment from "moment";

import type { ITask } from "@/features/tasks/interfaces/task-types";
import { StatusColorProfileMap } from "@/mui/mui-status-circle-wrapper";

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
                        <Task hourPixel={schedulerHeight / 24} startTime={480} endTime={540} taskTitle="Project work" taskDescription="Focus time for project tasks and deep work."/>
                        <Task hourPixel={schedulerHeight / 24} startTime={800} endTime={1000} taskTitle="Emails and Communication" taskDescription="Review code submissions and provide feedback to 
                        team members.Review code submissions and provide feedback to team members.R
                        eview code submissions and provide feedback to team members.Review code submissions and provide feedback to team members.Review code submissions and provide feedback to team members."/>
                        
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <Task hourPixel={schedulerHeight / 24} startTime={600} endTime={800} taskTitle="Team Meeting" taskDescription="Weekly sync with the team to discuss progress and blockers."/>
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <Task hourPixel={schedulerHeight / 24} startTime={540} endTime={565} taskTitle="Design Review" taskDescription="Review design mockups and provide feedback."/>
                        <Task hourPixel={schedulerHeight / 24} startTime={840} endTime={900} taskTitle="Client Call" taskDescription="Discuss project requirements and feedback with the client."/>     
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <Task hourPixel={schedulerHeight / 24} startTime={700} endTime={800} taskTitle="Code Review" taskDescription="Review code submissions and provide feedback to 
                        team members.Review code submissions and provide feedback to team members.R
                        eview code submissions and provide feedback to team members.Review code submissions and provide feedback to team members.Review code submissions and provide feedback to team members."/> 
                    </div>

                    <div className="flex flex-col h-full overflow-hidden border-r border-r-gray-200">
                        <Task hourPixel={schedulerHeight / 24} startTime={600} endTime={1140} taskTitle="Planning Session" taskDescription="Plan upcoming sprints and allocate tasks to team members."/>
                    </div>


                </div>
    ) 
});

// Add display name for debugging
TaskSchedulerContainer.displayName = 'TaskSchedulerContainer';

export default TaskSchedulerContainer;