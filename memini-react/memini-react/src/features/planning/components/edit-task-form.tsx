
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
import MuiStyledDateRangePicker from "../../../mui-wrappers/mui-date-range-picker";
import MaterialDateRangePicker, { MaterialDateRangePickerRef } from '../../../mui-wrappers/mui-date-range-picker';
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

//now + 1 hour
const defaultInterval = () : number[] => {
  const now = new Date();
  const start = now.getHours() * 60;
  const end = (now.getHours() + 1) * 60;
  return [start, end];
}

const intervalFromTask = (task : ITask | null) => {
  if (task) {    
  return [task.StartTime, task.EndTime];
  } else 
  return defaultInterval();
};

const dateFromTaskorNull = (task: ITask | null) : ISimpleDate | null => task ? {year: task.Year, month: task.Month, day: task.Day} : null;  

const EditTaskForm = () => {

  const createTaskFromFormData = (
      timeIntervalRef: React.RefObject<TimeSliderRef | null>,
      taskDateRef : any,
      taskTitle: string,
      taskDescription:string,
    ) : Omit<ITask, 'UserKey'> | void => {
    const timeIntervalIntegers : number[] = timeIntervalRef.current?.getValue() ?? [];
    const StartTime : number = timeIntervalIntegers[0] ? timeIntervalIntegers[0]: 0;
    const EndTime   : number = timeIntervalIntegers[1] ? timeIntervalIntegers[1]: 0;
    const taskDate           = taskDateRef.current?.getPickedDate();  
    
    console.log(taskTitle,taskDescription,taskDateRef);
    if(!taskDate) {
      alert("Please select a valid date for the task.");
      return;
    }

    const userTask : Omit<ITask, 'UserKey'> = { 
      UserTaskKey: selectedTask?.UserTaskKey ?? 0,                      
      Year: taskDate.year,
      Month: taskDate.month,
      Day: taskDate.day,
      Title: taskTitle,
      Description: taskDescription,
      StartTime: StartTime,
      EndTime: EndTime
    };

    return userTask;
  }

  const dragTaskRef        = useRef<HTMLDivElement>(null);
  const { updateTask, deleteTask, addTask } = useTaskManager();  
  const selectedTask      = useSelector((state : RootState ) => state.tasks.selectedTask);    
  const dispatch          = useDispatch(); 

  const [taskTitle, setTaskTitle] = useState<string> ("");
  const [taskDescription, setTaskDescription] = useState<string> ("");
  const [taskTimeInterval, setTaskTimeInterval] = useState<number[]> ([0, 0]);
  const [isEditing, setIsEditing] = useState<boolean> (false);

  const timeIntervalRef = createRef<TimeSliderRef>(); 
  const taskDateRef     = createRef<MuiDatePickerRef>();   
  
  useEffect(() => {
    setTaskTitle(selectedTask?.Title || "");
    setTaskDescription(selectedTask?.Description || "");
    setTaskTimeInterval(intervalFromTask(selectedTask));
    if(selectedTask)
      setIsEditing(true);
  }, [selectedTask]);

  const editTaskExist = () => selectedTask && selectedTask.UserTaskKey !== 0;

  const onSaveTask = () => {  
    const userTask : ITask | void = createTaskFromFormData(timeIntervalRef, taskDateRef, taskTitle, taskDescription);
    if(!userTask)
      return;

    if(userTask.UserTaskKey === 0) {
      addTask(userTask);
    } else {
      updateTask(userTask);  
    }          
    cancelEditing();
  } 

  const cancelEditing = () => {
    clearSelection();
    setIsEditing(false);
  }

  const clearSelection = () => {
    if(selectedTask === null) {
      setTaskTitle("");
      setTaskDescription("");
      setTaskTimeInterval(intervalFromTask(null));
  } else 
      dispatch(userTasksActions.clearSelectedTask());
  }

  const onDeleteUserTask = (userTask: ITask | null) => {
    if(userTask === null)
      return;

    deleteTask(userTask);
    cancelEditing();      
  }  

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragItemType.TASK,
    item: () => {
      const userTask = createTaskFromFormData(timeIntervalRef, taskDateRef, taskTitle, taskDescription);
      if (!userTask)
        return null;      
      return { displayTask: userTask as IDisplayTask };
    },
    canDrag: () => {   
      const userTask = createTaskFromFormData(timeIntervalRef, taskDateRef, taskTitle, taskDescription);
      return !!userTask;  // Fixed the logic
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),          
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {   
        cancelEditing();
      }  
    },
    }), [taskTitle, taskDescription, timeIntervalRef, taskDateRef]);

  drag(dragTaskRef);

  return (<>
    <div className="grid grid-cols-6 transition-all duration-300 ease-in-out">
        <div className="col-span-3 flex items-center justify-start w-full overflow-hidden">
            <Typography variant="h5" className="break-words w-full">
                Management
            </Typography>
        </div>
        <div className="col-span-3 flex items-center justify-end">
          { isEditing &&          
            <div className="flex gap-2">
               <MuiStyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'main' borderType = 'rounded' opacity={.85} 
                  onClick={() => {cancelEditing()}} >                   
                <Typography variant="subtitle2"> Cancel </Typography>     
              </MuiStyledButton> 

              <MuiStyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'main' borderType = 'rounded' opacity={.85} disabled={taskTitle.length === 0}
                onClick={() => {onSaveTask()}} >   
                <Typography variant="subtitle2"> Save </Typography>     
              </MuiStyledButton>
            </div>     
          } 
          
          { !isEditing && 
            <MuiStyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'harmonicBlue' borderType = 'semiStraight' 
              opacity={1.0} highlightBorderOnHover={true} highlightBackgroundOnHover={true} applyThemeFontColor={true} textOpacity={1.0}
              onClick={() => {setIsEditing(true)}}
              >
              <PackagePlus size={16} style={{ marginLeft: '0', marginRight: '.25rem', opacity:0.85 }}/>
              <Typography 
                    variant="body2" 
                    color="inherit"                     
                    > 
                    Create Task 
                </Typography>            
            </MuiStyledButton>
          }

        </div>

        <div className="col-span-5 flex items-start mt-4">
            <Typography variant="body2" color="text.secondary">
                Edit scheduled tasks or create new ones
            </Typography>  
        </div>

        { editTaskExist() && 
          <div className="col-span-1 flex items-center justify-end mt-4">
            <MuiStyledButton themeColor = 'light' buttonSize = 'xs' buttonVariant = 'harmonicRed' borderType = 'semiStraight' opacity={.85} onClick={() => {onDeleteUserTask(selectedTask)}}>                    
              <Typography variant="subtitle2" fontSize={9}> Delete </Typography>
            </MuiStyledButton> 
          </div>
        }

        <div className="col-span-6 border-t border-t-gray-200 w-3/4 mt-2">
        </div>
        
         { isEditing && 
            <>
              <div className="col-span-6 flex items-start justify-start mb-4 mt-8">                         
              <MuiStyledTextField
                required
                size='small'                     
                id="outlined-basic"
                label="Title"
                placeholder="Whatsup?"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.currentTarget.value)}
                variant="outlined"
                className="w-3/4"
                themeProps={{
                    paletteProfile: 'main',
                    borderProfile: 'semiStraight',
                    spacingProfile: 'medium',
                    mode: 'light',
                    fontSize: '12px',
                    labelFontSize: '12px',
                    labelOpacity: 0.85,
                    helperTextFontSize:'11px',
                    helperTextOpacity:0.6                                 
                }}
                />
              </div>

              <div className="col-span-6 flex items-start justify-start mb-8">                         
                    <MuiStyledTextField 
                      multiline                           
                      size='small'
                      id="outlined-basic"
                      label="Description"
                      placeholder="Describe the event..."
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.currentTarget.value)}
                      variant="outlined"
                      className="w-3/4"
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
                  ref={taskDateRef}
                  defaultDate={dateFromTaskorNull(selectedTask)}
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
                ref={timeIntervalRef}
                timeInterval={taskTimeInterval}
                onChange={setTaskTimeInterval}  />
              </div>             

              {
                taskTitle.length > 0 &&
                  <div ref={dragTaskRef} className="col-span-6 flex items-center justify-center mt-2 gap-2">
                    <MuiStyledButton themeColor = 'light' buttonSize = 'lg' buttonVariant = 'main' borderType = 'rounded' opacity={.85}> 
                      <Typography variant="subtitle2"> Drop in shedule </Typography>
                      <DragIndicator direction="right" animationStyle="chevrons" size={24} color="#2196F3" className="ml-4 mr-4"/>
                    </MuiStyledButton>                     
                  </div>
              }

            </>
          }
      
      </div>
  </>)
}

export default EditTaskForm;