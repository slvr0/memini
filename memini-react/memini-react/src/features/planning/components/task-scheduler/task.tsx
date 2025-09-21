import { Fragment, useState } from "react";

import { SxProps } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom";

import Tooltip from '@mui/material/Tooltip';
import { RootState } from "../../../../store";
import { Hub } from '@mui/icons-material';
import { Link } from '@mui/icons-material';
import MUI_StyledButton from "@/mui/mui-button-wrapper";
import MUI_StyledSegment from "@/mui/mui-segment-wrapper"
import MUI_StyledStatusCircle , { StatusColorProfileMap, StatusType  } from "@/mui/mui-status-circle-wrapper"
import LucidIconButton from "@/lucid/lucid-button-icon"
import { Typography, Box, Grid } from "@mui/material";

import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { SquarePen, Star, RotateCcw, Trash2, Share2, House, Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText, CalendarSync, CakeSlice, Contact, MessageSquare, NotebookPen } from "lucide-react";

//stackedProfile , can be in columns i guess if multiple are at same time.
//status icon , coming soon, passed, or future. coming soon , orange, passed gray ish , coming soon blue.

interface TaskProps {
    hourPixel:number;
    startTime: number;
    endTime: number;   
    taskTitle: string;
    taskDescription?: string;
    status?: StatusType; 
}

interface TaskLayoutProps {
    taskTitle: string;
    taskDescription?: string;
    status?: StatusType; 
}


const TaskLayoutMedium : React.FC<TaskLayoutProps> = (props) => {

    return (
        <Tooltip title={props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )} arrow>
            <div className="grid grid-rows-[20%_30%_50%] h-full items-center mx-2 my-2">
                <div className="flex flex-row gap-2 m-2 justify-between items-center">
                        <MUI_StyledStatusCircle color="blue" size={8} status={props.status}></MUI_StyledStatusCircle>
                        <div className="flex flex-row gap-2">
                            <MUI_StyledSegment spacing="segmentMini" borderProfile="rounded">     
                            <LucidIconButton
                            icon={SquarePen}
                            size={14}
                            opacity={.6}
                            palette="main"
                            borderProfile="rounded"
                            highlightBackgroundOnHover={true}
                            highlightBorderOnHover={true}
                            displayBorder={false}
                            tooltip="Edit/Modify"
                            onClick={() => console.log("Clicked Home")}
                            /> 
                            <LucidIconButton
                            icon={Star}
                            size={14}
                            opacity={.6}
                            palette="main"
                            borderProfile="rounded"
                            highlightBackgroundOnHover={true}
                            highlightBorderOnHover={true}
                            displayBorder={false}
                            tooltip="Add to favorites"
                            onClick={() => console.log("Clicked Home")}
                            /> 
                            <LucidIconButton
                            icon={Share2}
                            size={14}
                            opacity={.6}
                            palette="main"
                            borderProfile="rounded"
                            highlightBackgroundOnHover={true}
                            highlightBorderOnHover={true}
                            displayBorder={false}
                            tooltip="Share"
                            onClick={() => console.log("Clicked Home")}
                            /> 
                            <LucidIconButton
                            icon={Trash2}
                            size={14}
                            opacity={.6}
                            palette="main"
                            borderProfile="rounded"
                            highlightBackgroundOnHover={true}
                            highlightBorderOnHover={true}
                            displayBorder={false}
                            tooltip="Delete"
                            onClick={() => console.log("Clicked Home")}
                            />
                            </MUI_StyledSegment>
                        </div>                            
                </div>  
                <div className="flex flex-row gap-2 m-2 justify-start">
                    <Typography variant="overline" className="font-semibold opacity-95 m-2 overflow-hidden" style={{color:''}}> 'Size MD' {props.taskTitle}</Typography>
                </div>  
                <div className="flex flex-row gap-2 m-2 justify-start truncate overflow-hidden whitespace-nowrap">
                    <Typography 
                        variant="caption" 
                        className="font-semibold opacity-95 m-2 overflow-ellipsis wrap-break-word break-all"
                        > 
                        {props.taskTitle + (props.taskDescription ? ' - ' + props.taskDescription : '')}
                    </Typography> 
                </div> 
            </div>
    </Tooltip>)
}

const TaskLayoutUltraCompact : React.FC<TaskLayoutProps> = (props) =>{    
    return (
        <Tooltip title={props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )} arrow>
            <div className="h-full w-full p-1 overflow-hidden flex items-center justify-between min-h-0">
                <Typography 
                    variant="caption" 
                    className="font-semibold opacity-85 flex-1 truncate text-ellipsis whitespace-nowrap" 
                    style={{
                        color: 'black', 
                        fontSize: '9px',
                        letterSpacing: '.025rem',
                        minWidth: 0
                    }}
                > 
                    {props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )}
                </Typography>
                
                <div className="flex flex-row gap-0.5 ml-1 flex-shrink-0">
                    <LucidIconButton
                        icon={SquarePen}
                        size={8}
                        opacity={.8}
                        palette="main"
                        borderProfile="rounded"
                        highlightBackgroundOnHover={true}
                        highlightBorderOnHover={true}
                        displayBorder={false}
                        tooltip="Edit/Modify"
                        onClick={() => console.log("Clicked Home")}
                    /> 
                        <LucidIconButton
                        icon={Star}
                        size={8}
                        opacity={.8}
                        palette="main"
                        borderProfile="rounded"
                        highlightBackgroundOnHover={true}
                        highlightBorderOnHover={true}
                        displayBorder={false}
                        tooltip="Add to favorites"
                        onClick={() => console.log("Clicked Home")}
                    /> 
                    <LucidIconButton
                        icon={Share2}
                        size={8}  // Much smaller
                        opacity={.8}
                        palette="main"
                        borderProfile="rounded"
                        highlightBackgroundOnHover={true}
                        highlightBorderOnHover={false}
                        displayBorder={false}
                        tooltip="Share"
                        onClick={() => console.log("Clicked Share")}
                    />
                    
                    <LucidIconButton
                        icon={Trash2}
                        size={8}  // Much smaller
                        opacity={.8}
                        palette="main"
                        borderProfile="rounded"
                        highlightBackgroundOnHover={true}
                        highlightBorderOnHover={false}
                        displayBorder={false}
                        tooltip="Delete"
                        onClick={() => console.log("Clicked Delete")}
                    />
                </div>
            </div>
        </Tooltip>
    )
}

const TaskLayoutCompact : React.FC<TaskLayoutProps> = (props) => {    
    return (
        <Tooltip title={props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )} arrow>
            <div className="h-full w-full p-1 overflow-hidden flex items-center justify-between min-h-0">
                <Typography 
                    variant="caption" 
                    className="opacity-85 flex-1 truncate text-ellipsis whitespace-nowrap" 
                    style={{
                        color: 'black', 
                        fontSize: '11px',
                        letterSpacing: '.025rem',
                        minWidth: 0
                    }}
                > 
                    { props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' ) }
                </Typography>
                
                <div className="flex flex-row gap-0.5 ml-1 flex-shrink-0">
                     <LucidIconButton
                        icon={SquarePen}
                        size={12}
                        opacity={.8}
                        palette="main"
                        borderProfile="rounded"
                        highlightBackgroundOnHover={true}
                        highlightBorderOnHover={true}
                        displayBorder={false}
                        tooltip="Edit/Modify"
                        onClick={() => console.log("Clicked Home")}
                    /> 
                        <LucidIconButton
                        icon={Star}
                        size={12}
                        opacity={.8}
                        palette="main"
                        borderProfile="rounded"
                        highlightBackgroundOnHover={true}
                        highlightBorderOnHover={true}
                        displayBorder={false}
                        tooltip="Add to favorites"
                        onClick={() => console.log("Clicked Home")}
                    /> 
                    <LucidIconButton
                        icon={Share2}
                        size={12}  // Much smaller
                        opacity={.8}
                        palette="main"
                        borderProfile="rounded"
                        highlightBackgroundOnHover={true}
                        highlightBorderOnHover={false}
                        displayBorder={false}
                        tooltip="Share"
                        onClick={() => console.log("Clicked Share")}
                    />
                    
                    <LucidIconButton
                        icon={Trash2}
                        size={12}  // Much smaller
                        opacity={.8}
                        palette="main"
                        borderProfile="rounded"
                        highlightBackgroundOnHover={true}
                        highlightBorderOnHover={false}
                        displayBorder={false}
                        tooltip="Delete"
                        onClick={() => console.log("Clicked Delete")}
                    />
                </div>
            </div>
        </Tooltip>
    )
}

const getHeightCategory = (height: number) => {
    if (height < 20) return 'ultra-compact';
    if (height < 40) return 'compact';
    if (height < 80) return 'medium';
    return 'large';
}

const getTaskLayout = (height: number, props: TaskLayoutProps): JSX.Element => {
  const category = getHeightCategory(height);
  
  switch(category) {
    case 'ultra-compact':
      return <TaskLayoutUltraCompact {...props} />;
    case 'compact':
      return <TaskLayoutCompact {...props} />;
    case 'medium':
      return <TaskLayoutMedium {...props} />;
    default:
      return <TaskLayoutMedium {...props} />;
  }
};

const Task : React.FC<TaskProps> = (props) => {

    var yPos = (props.startTime / 60) * props.hourPixel;
    var height = ((props.endTime - props.startTime) / 60) * props.hourPixel;

    return (
        <div className="border rounded-md accent-transparent transition-all duration-300" 
            style={{                
                borderColor: '#9ccec4',
                borderWidth: '1.5px',
                position: 'relative',
                top: yPos,
                height: height,
                backdropFilter: 'blur(2px)', 
            }}>
            {getTaskLayout(height, { 
                taskTitle: props.taskTitle, 
                taskDescription: props.taskDescription, 
                status: props.status 
            })}
        </div>    
    ) 
}

export default Task;