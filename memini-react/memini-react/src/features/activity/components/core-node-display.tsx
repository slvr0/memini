
import React, { useState, createRef, forwardRef, useImperativeHandle } from 'react';
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
import { minutesToHHMM } from "../computes/time-display-formatting";
import MuiStyledButton from "../../../mui-wrappers/mui-button-wrapper";
import MuiStyledTextField from "../../../mui-wrappers/mui-textfield-wrapper";
import { PackagePlus} from "lucide-react";

import MuiStyledDatePicker from "../../../mui-wrappers/mui-datepicker-wrapper";


import { useEffect, useRef } from 'react';
import {DragIndicator} from "../../../lucid/lucid-anim-demo-2";
import {LoadingSpinner, SparklingIcon, BouncingArrow} from "../../../lucid/lucid-animated-button-icon";
import LucidIconButton from "../../../lucid/lucid-button-icon"
import { CircleX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from "../../../store/index";

import { ISimpleDate } from '@/interfaces/common-interfaces';
import { AddTask } from '@mui/icons-material';
import { useDrag } from 'react-dnd';

import dayjs, { Dayjs } from 'dayjs';
import { Activity } from '../interface/activity';

//now + 1 hour
const defaultInterval = () : number[] => {
  const now = new Date();
  const start = now.getHours() * 60;
  const end = (now.getHours() + 1) * 60;
  return [start, end];
}

const dayJsToTaskDate = (date: Dayjs): ISimpleDate => {
  return {
    year: date.year(),
    month: date.month(),
    day: date.date()
  };
};



const intervalFromActivity = (activity?: Activity | null) => {
  if (activity) {    
  return [activity.StartTime, activity.EndTime];
  } else 
  return defaultInterval();
};

const dayJsFromActivity = (activity?: Activity | null): Dayjs => activity?.StartDate ?? dayjs();

interface CoreNodeEditFormProps {
  activity?:Activity;
}

export interface CoreNodeRef {
    getValues: () => void;  
}

const CoreNodeEditForm = forwardRef<CoreNodeRef, CoreNodeEditFormProps>((props, ref) => {

  

  useImperativeHandle(ref, () => {
    return {
        getValues() {
          return getCoreNodeData();
        }
    };
  });

  const getCoreNodeData = () => { 
    const taskDate           = dayJsToTaskDate(selectedDate);
    if(!taskDate) {
      alert("Please select a valid date for the task.");
      return;
    }

    const startDate = dayjs()
    .year(taskDate.year)
    .month(taskDate.month ) // dayjs months are 0-based
    .date(taskDate.day)
    .hour(taskTimeInterval[0] / 60)
    .minute(taskTimeInterval[0] % 60)
    .second(0).format("YYYY-MM-DD HH:mm:ss");

    const endDate = dayjs()
    .year(taskDate.year)
    .month(taskDate.month ) // dayjs months are 0-based
    .date(taskDate.day)
    .hour(taskTimeInterval[1] / 60)
    .minute(taskTimeInterval[1] % 60)
    .second(0).format("YYYY-MM-DD HH:mm:ss");

    return {
      startDate,
      endDate,
      description: taskDescription
    }

  }

  const [taskTitle, setTaskTitle] = useState<string> ("");
  const [taskDescription, setTaskDescription] = useState<string> ("");
  const [taskTimeInterval, setTaskTimeInterval] = useState<number[]> (intervalFromActivity(props.activity));
  const [selectedDate, setSelectedDate] = useState<Dayjs>(
    dayJsFromActivity(props.activity)
  );

  useEffect(() => {
    setTaskTitle(props.activity?.Label || "");
    setTaskDescription(props.activity?.Description || "");
    setTaskTimeInterval(intervalFromActivity(props.activity));
  }, [props.activity]);  


  return (<>
    <div className="grid grid-cols-6 transition-all duration-300 ease-in-out">
       

        <div className="col-span-5 flex items-start mt-4">
            <Typography variant="body2" color="text.secondary">
                Schedule details
            </Typography>  
        </div>

        <div className="col-span-6 border-t border-t-gray-200 w-3/4 mt-2">
        </div>

        <div className="col-span-6 flex items-start justify-start mb-8">                         
            <MuiStyledTextField
                fullWidth    
                multiline                           
                size='small'
                id="outlined-basic"
                label="Description"
                placeholder="Describe the event..."
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.currentTarget.value)}
                variant="standard"
                className=""
                themeProps={{
                    paletteProfile: 'main',
                    borderProfile: 'semiStraight',
                    spacingProfile: 'roomy',
                    mode: 'light',
                    fontSize: '12px',
                    labelFontSize: '12px',
                    labelOpacity: 0.85,
                    helperTextFontSize:'11px',
                    helperTextOpacity:0.6                                 
                }}
                />
        </div> 

        <div className="col-span-4 flex items-start justify-start">
        <MuiStyledDatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            buttonSize="md"
            buttonVariant="main"
            borderType="semiStraight"              
            label="Start date"
        />
        </div>

        <div className="col-span-2 flex items-center justify-center my-auto">
        <Typography variant='caption'>                    
        @ {' '}             
        {minutesToHHMM(taskTimeInterval[0])} →{" "}
        {minutesToHHMM(taskTimeInterval[1])}             
        </Typography>
        </div>

        <div className="col-span-6 mt-2">
        <DiscreteDoubleTimeSlider       
            value={taskTimeInterval}
            onChange={setTaskTimeInterval}  />
        </div>  

            
          
      
      </div>
  </>)
});

export default CoreNodeEditForm;