
import DiscreteDoubleTimeSlider from "../../general/components/discrete-double-time-slider"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { userTasksActions } from "../../tasks/store/task-slice";
import { useTaskManager } from "../../tasks/utils/task-manager";
import {createRef,  useState, useEffect} from "react";
import MuiDatePicker from "../../general/components/mui-date-picker";
import type { Task } from "../../tasks/interfaces/task-types";
import { RootState } from "../../../store/index";
import { MuiDatePickerRef } from "../../general/interfaces/general-types";
import type {TimeSliderRef, DiscreteDoubleTimeSliderProps} from "../../general/interfaces/general-types";

const snap15 = (m: number) => Math.round(m / 15) * 15;
  const defaultInterval = () => {
  const now = new Date();
  const start = snap15(now.getHours() * 60);
  const end = snap15((now.getHours() + 1) * 60);
  return [start, end];
};

const intervalFromTask = (task : Task | null) => {
  if (task) {    
  return [task.StartTime, task.EndTime];
  } else 
  return defaultInterval();
};

function ManageTaskTab() { 
    const { updateTask, deleteTask } = useTaskManager();  
    const selectedTask      = useSelector((state : RootState ) => state.tasks.selectedTask);    
    const dispatch          = useDispatch(); 
    
    const [title, setTitle] = useState(selectedTask?.Title || "");
    const [description, setDescription] = useState(selectedTask?.Description || "");   
    const [timeInterval, setTimeInterval] = useState(() => intervalFromTask(selectedTask));
      
    const titleRef        = createRef<HTMLInputElement>();
    const descriptionRef  = createRef<HTMLInputElement>();
    const timeIntervalRef = createRef<TimeSliderRef>(); 
    const taskDateRef     = createRef<MuiDatePickerRef>(); 

    useEffect(() => {
      setTitle(selectedTask?.Title || "");
      setDescription(selectedTask?.Description || "");
      setTimeInterval(intervalFromTask(selectedTask));
    }, [selectedTask]); // if selectedtask is set.   

    const clearSelection = () => {
      if(selectedTask === null) {
        setTitle("");
        setDescription("");
        setTimeInterval(intervalFromTask(null));
      } else 
        dispatch(userTasksActions.clearSelectedTask());
    }

    const onDeleteUserTask = (userTask: Task) => {
      if(userTask === null)
        return;

      deleteTask(userTask);
      clearSelection();
    }

    const onSaveTask = () => {
        const UserTaskKey = selectedTask?.UserTaskKey ?? 0;
        const Title = titleRef.current?.value || '';
        const Description = descriptionRef.current?.value || ''; 
        //const timeInterval : string[] = timeIntervalRef.current?.getValue() ?? [];
        const timeIntervalIntegers : number[] = timeIntervalRef.current?.getValue() ?? [];
        const StartTime : number = timeIntervalIntegers[0] ? timeIntervalIntegers[0]: 0;
        const EndTime : number = timeIntervalIntegers[1] ? timeIntervalIntegers[1]: 0;
        const taskDate = taskDateRef.current?.getPickedDate();

        if(!taskDate) {
          alert("Please select a valid date for the task.");
          return;
        }
        const Year = taskDate.year;
        const Month = taskDate.month;
        const Day = taskDate.day;

        const userTask : Omit<Task, 'UserKey'> = { 
          UserTaskKey: UserTaskKey,                      
          Year: Year,
          Month: Month,
          Day: Day,
          Title: Title,
          Description: Description,
          StartTime: StartTime,
          EndTime: EndTime
        };

        updateTask(selectedTask, userTask);        
        clearSelection();
    }   

    return (
        <>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 2, flex: 1 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
            noValidate
            autoComplete="off"
          >
            {/* Top row with inputs + buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                inputRef={titleRef}
                id="outlined-required"
                label="Title"
                multiline
                maxRows={1}
                placeholder="Whats the plan chief?"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                variant="standard"
              />
              <TextField
                inputRef={descriptionRef}
                id="filled-multiline-static"
                label="Task description"
                multiline
                maxRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the activity..."
                variant="standard"
              />
              <Stack direction="row" spacing={2} sx={{ ml: 2, mr:2 }}>
                <Button variant="outlined" onClick={() => {onSaveTask()}}>Save/Update</Button>
                <Button variant="outlined" disabled={selectedTask === null} onClick={() => {onDeleteUserTask(selectedTask)}}>
                  Delete
                </Button>
              </Stack>
            </Box>

              <div className="w-128 ml-4">
                {selectedTask && 
                  <MuiDatePicker 
                    defaultDate={{
                      year: selectedTask.Year, 
                      month: selectedTask.Month, 
                      day: selectedTask.Day  
                    }} 
                    ref={taskDateRef} 
                  />
                }
                {
                  !selectedTask && 
                  <MuiDatePicker 
                    defaultDate={null} 
                    ref={taskDateRef} 
                  />
                }                
                
              </div>
            {/* Second row for the slider */}
            <DiscreteDoubleTimeSlider  
              ref={timeIntervalRef}
              timeInterval={timeInterval}
              onChange={setTimeInterval}  />
          </Box>
        </>
    )
}

export default ManageTaskTab;