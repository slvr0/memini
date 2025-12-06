
import React, { useState, createRef } from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box,
  Button,
  Typography,
 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DiscreteDoubleTimeSlider from "../../../mui-wrappers/mui-double-time-slider-wrapper"
import type {TimeSliderRef, DiscreteDoubleTimeSliderProps,MuiDatePickerRef} from "../../../mui-wrappers/interfaces/mui-interfaces";
import { minutesToHHMM } from "../../tasks/computes/time-display-formatting";
import MuiStyledButton from "../../../mui-wrappers/mui-button-wrapper";
import MuiStyledTextField from "../../../mui-wrappers/mui-textfield-wrapper";
import { PackagePlus} from "lucide-react";

import MuiStyledDatePicker from "../../../mui-wrappers/mui-datepicker-wrapper";

import { IDisplayTask, ITask } from "../../tasks/interfaces/task-interface";
import { useEffect, useRef } from 'react';
import {DragIndicator} from "../../../lucid/lucid-anim-demo-2";
import {LoadingSpinner, SparklingIcon, BouncingArrow} from "../../../lucid/lucid-animated-button-icon";
import LucidIconButton from "../../../lucid/lucid-button-icon"
import { CircleX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useTaskManager } from "../../tasks/utils/task-manager";
import { RootState } from "../../../store/index";
import { userTasksActions } from "../../tasks/store/task-slice";
import { ISimpleDate } from '@/interfaces/common-interfaces';
import { AddTask } from '@mui/icons-material';
import { useDrag } from 'react-dnd';
import { DragItemType } from '../../tasks/components/display-task';
import dayjs, { Dayjs } from 'dayjs';

import ActivityDisplayContainer from "../../activity/components/activity-display-container";

import { ActivityDisplayRef } from "../../activity/components/activity-display-container";

const EditTaskForm = () => { 
  const activityDisplayRef = useRef<ActivityDisplayRef>(null);

  /* useEffect, conditional re-render logic  */
  const [{ isDragging }, drag] = useDrag({
    type: DragItemType.TASK,
    item: () => {
      //const userTask = createTaskFromFormData(taskTimeInterval, selectedDate, taskTitle, taskDescription); 
      // if (!userTask) return null;      
      return { displayTask: null };
    },
    canDrag: () => { 
      return true;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),          
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {   
        //cancelEditing();
      }  
    },
  });
  return (
    <>
     <ActivityDisplayContainer ref={activityDisplayRef} canToggleActivityView={true}/>

    <div className="grid grid-cols-6 transition-all duration-300 ease-in-out">

        <div className="col-span-3 flex items-center justify-start w-full overflow-hidden">
            <Typography variant="h5" className="break-words w-full">
                Management
            </Typography>
        </div>

        <div className="col-span-3 flex items-center justify-end">
          <MuiStyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'harmonicBlue' borderType = 'semiStraight' 
              opacity={1.0} highlightBorderOnHover={true} highlightBackgroundOnHover={true} applyThemeFontColor={true} textOpacity={1.0}        
              onClick={() => {activityDisplayRef.current?.openModal()}}
              >
              <PackagePlus size={16} style={{ marginLeft: '0', marginRight: '.25rem', opacity:0.85 }}/>
              <Typography 
                    variant="body2" 
                    color="inherit"                     
                    > 
                    Create Activity 
                </Typography>            
            </MuiStyledButton>
        </div>

        <div className="col-span-5 flex items-start mt-4">
            <Typography variant="body2" color="text.secondary">
                Use the button above or drag a favorited/recent activity to the scheduler to create a new activity.
            </Typography>  
        </div>

        <div className="col-span-6 border-t border-t-gray-200 w-3/4 mt-2">
        </div>  
    </div>
    </>
  )
}

export default EditTaskForm;