
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


import {DragIndicator} from "../../../../lucid/lucid-anim-demo-2";
import {LoadingSpinner, SparklingIcon, BouncingArrow} from "../../../../lucid/lucid-animated-button-icon";
import EditTaskForm from "../edit-task-form"

interface TaskMaintainerContainerProps {

}

type PanelType = 'favorites' | 'recent' | false;

const TaskMaintainerContainer: React.FC<TaskMaintainerContainerProps> = (props) => {


  const [expanded, setExpanded] = useState<PanelType>('favorites');


  const handleChange = (panel: 'favorites' | 'recent') => 
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const [favorites] = useState([
    { id: 1, name: 'Weekly Team Meeting', time: '2:00 PM' },
    { id: 2, name: 'Code Review', time: '10:00 AM' },
    { id: 3, name: 'Project Planning', time: '3:00 PM' }
  ]);

  const [recent] = useState([
    { id: 4, name: 'Client Call', time: '1:00 PM', date: 'Today' },
    { id: 5, name: 'Design Review', time: '4:00 PM', date: 'Yesterday' },
    { id: 6, name: 'Sprint Retrospective', time: '11:00 AM', date: '2 days ago' }
  ]);

    return (
    <div className="">
      {/* Header Section with Create Task Button */}
      <div className="p-4 border-b border-gray-200 bg-white h-2/4">
        <EditTaskForm/>
      </div>

      {/* Accordions Section - Takes remaining height */}
      <div className="flex-1 overflow-y-auto h-2/4">
        {/* Favorites Accordion */}
        <Accordion 
            expanded={expanded === 'favorites'} 
            onChange={handleChange('favorites')}
            defaultExpanded 
            disableGutters 
            square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="favorites-content"
            id="favorites-header"
          >
            <Typography component="span" fontWeight="medium">
              Favorites
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <div className="divide-y divide-gray-100">
              {favorites.map((task) => (
                <div 
                  key={task.id} 
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Typography variant="body2" fontWeight="medium">
                    {task.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {task.time}
                  </Typography>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Recent Accordion */}
        <Accordion 
            expanded={expanded === 'recent'} 
            onChange={handleChange('recent')}
            defaultExpanded 
            disableGutters 
            square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="recent-content"
            id="recent-header"
          >
            <Typography component="span" fontWeight="medium">
              Recent
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <div className="divide-y divide-gray-100">
              {recent.map((task) => (
                <div 
                  key={task.id} 
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Typography variant="body2" fontWeight="medium">
                    {task.name}
                  </Typography>
                  <div className="flex justify-between items-center mt-1">
                    <Typography variant="caption" color="text.secondary">
                      {task.time}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {task.date}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default TaskMaintainerContainer;