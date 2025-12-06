
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
import DiscreteDoubleTimeSlider from "../../../../mui-wrappers/mui-double-time-slider-wrapper"
import type {TimeSliderRef, DiscreteDoubleTimeSliderProps,MuiDatePickerRef} from "../../../../mui-wrappers/interfaces/mui-interfaces";
import { minutesToHHMM } from "../../../tasks/computes/time-display-formatting";
import MuiStyledButton from "../../../../mui-wrappers/mui-button-wrapper";
import MuiStyledTextField from "../../../../mui-wrappers/mui-textfield-wrapper";
import { PackagePlus} from "lucide-react";

import MuiStyledDatePicker from "../../../../mui-wrappers/mui-datepicker-wrapper";
import TaskMaintainerRecentFavorites from './task-maintainer-recent-favorites';

import {DragIndicator} from "../../../../lucid/lucid-anim-demo-2";
import {LoadingSpinner, SparklingIcon, BouncingArrow} from "../../../../lucid/lucid-animated-button-icon";
import EditTaskForm from "../edit-task-form"

interface TaskMaintainerContainerProps {

}

const TaskMaintainerContainer: React.FC<TaskMaintainerContainerProps> = (props) => {
    return (
    <div className="">
      {/* Header Section with Create Task Button */}
      <div className="p-4 border-b border-gray-200 bg-white h-2/4">
        <EditTaskForm/>
      </div>

      {/* Accordions Section - Takes remaining height */}
      <div className="flex-1 overflow-y-auto h-2/4">
        {/* Favorites Accordion */}        
        <TaskMaintainerRecentFavorites/>
      </div>
    </div>
  );
}

export default TaskMaintainerContainer;