
import React, { useState, createRef, Fragment, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { groupNodesByDay } from "../../computes/task-scheduler-computations"
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box,
  Button,
  Typography,
 
} from '@mui/material';

interface RecentFavoriteAccordionSegment{
    // storedTasks: IStoredUserTask[];
    // onSelect: (selected: IStoredUserTask) => void;
}

/* Just a display component */
const RecentAccordionSegment : React.FC<RecentFavoriteAccordionSegment> = (props) => {
    // const storedTasksGroupedByDate = groupNodesByDay(props.storedTasks);

    return (<>
         {/* <AccordionDetails sx={{ padding: 0 }}>
            {Object.entries(storedTasksGroupedByDate).map(([date, tasks], index) => (

                <div key={index} className="mx-4 border-t border-t-gray-200"> 
                    <Typography variant="caption" color="text.secondary" fontWeight="medium" fontSize={'12px'}>
                        {new Date(date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                        ({tasks.length} {tasks.length === 1 ? 'task' : 'tasks'})
                    </Typography>
            
                    <AccordionDetails sx={{ padding: 0 }}>
                        <div className="divide-y divide-gray-100">
                            {tasks.map((task: IStoredUserTask,index: number) => (
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
                </div>
            ))}
            </AccordionDetails> */}
    
    
    </>); 
}

export default RecentAccordionSegment;