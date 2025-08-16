
import DiscreteDoubleTimeSlider from "../../general-components/components/discrete-double-time-slider.jsx"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { userTasksActions } from "../../../redux-memini-store.js";
import React, {createRef,  useState, useEffect} from "react";
import MuiDatePicker from "../../general-components/components/mui-date-picker.jsx";
import { deleteUserTask, addUserTask, saveUserTask } from "../../../services/usertask-service.js";

const snap15 = (m) => Math.round(m / 15) * 15;
  const defaultInterval = () => {
  const now = new Date();
  const start = snap15(now.getHours() * 60);
  const end = snap15((now.getHours() + 1) * 60);
  return [start, end];
};

const intervalFromTask = (task) => {
  if (task) {    
  return [task.StartTime, task.EndTime];
  } else 
  return defaultInterval();
};

function ManageTaskTab() { 
    const selectedTask      = useSelector((state) => state.userTasks.selectedTask);    
    const dispatch          = useDispatch(); 
    const titleRef          = createRef();
    const [title, setTitle] = useState(selectedTask?.Title || "");
    const [description, setDescription] = useState(selectedTask?.Description || "");   
    const [timeInterval, setTimeInterval] = useState(() => intervalFromTask(selectedTask));

    const descriptionRef  = createRef();
    const timeIntervalRef = createRef(); 
    const taskDateRef     = createRef(); 

    useEffect(() => {
      setTitle(selectedTask?.Title || "");
      setDescription(selectedTask?.Description || "");
      setTimeInterval(intervalFromTask(selectedTask));
    }, [selectedTask]); // runs whenever selectedTask changes    

    const clearSelection = () => {
      if(selectedTask === null) {
        setTitle("");
        setDescription("");
        setTimeInterval(intervalFromTask(null));
      } else 
        dispatch(userTasksActions.clearSelectedTask());
    }

    const onDeleteUserTask = (userTask) => {
      if(userTask === null)
        return;

      deleteUserTask( userTask ).then(response => {
        dispatch(userTasksActions.deleteTask( userTask ));
      }).catch(err => console.error(err)).then(_ => {
        clearSelection();
      }); 
    }

    const onSaveTask = () => {
        const UserTaskKey = selectedTask?.UserTaskKey ?? 0;
        const Title = titleRef.current.value;
        const Description = descriptionRef.current.value;
        const timeInterval = timeIntervalRef.current.getValue();
        const StartTime = parseInt(timeInterval[0]);
        const EndTime = parseInt(timeInterval[1]);       
        const taskDate = taskDateRef.current.getPickedDate();
        const Year = taskDate.year;
        const Month = taskDate.month;
        const Day = taskDate.day;

        const userTask = { 
          UserTaskKey: UserTaskKey,                      
          Year: Year,
          Month: Month,
          Day: Day,
          Title: Title,
          Description: Description,
          StartTime: StartTime,
          EndTime: EndTime
        };  
        
        if(userTask.UserTaskKey === 0) {
          addUserTask( userTask).then(response => {    
            console.log(response.data.ResponseObject);       
            dispatch(userTasksActions.addTask(response.data.ResponseObject));
          }).catch(err => console.error(err));  
        } else {
          saveUserTask( userTask ) 
          .then(_ => { //TODO: more correct would be to dispatch the returned userTask in response                          
            dispatch(userTasksActions.updateTask(userTask));
          }).catch(err => console.error(err));   
        } 
        
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
                <MuiDatePicker selectedTask={selectedTask} ref={taskDateRef}  />
                
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