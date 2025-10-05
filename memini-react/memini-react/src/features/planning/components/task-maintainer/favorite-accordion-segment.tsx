
import React, { useState, createRef, Fragment, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTaskManager} from "../../../tasks/utils/task-manager"
import type { DateKey, IDisplayTask, ITask, IStoredUserTask, IStoredUserTaskResponse } from "../../../tasks/interfaces/task-interface";
import { groupTasksByDay } from "../../computes/task-scheduler-computations"
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box,
  Button,
  Typography,
 
} from '@mui/material';

interface RecentFavoriteAccordionSegment{
    storedTasks: IStoredUserTask[];
    onSelect: (selected: IStoredUserTask) => void;
}

/* Just a display component */
const FavoriteAccordionSegment : React.FC<RecentFavoriteAccordionSegment> = (props) => {   
    return (
        <>
            <AccordionDetails sx={{ padding: 0 }}>
                <div className="divide-y divide-gray-100">
                    {props.storedTasks.map((task: IStoredUserTask,index: number) => (
                        <div 
                            key={index} 
                            className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => {props.onSelect(task)}}
                        >
                            <Typography variant="body2" fontWeight="medium">
                                {task.Title}
                            </Typography>
                            <div className="flex justify-between items-center mt-1">
                                <Typography variant="caption" color="text.secondary">
                                    {task.Description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {task.Duration ? `${task.Duration} min` : ''}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionDetails> 
        </>
    ); 
}

export default FavoriteAccordionSegment;