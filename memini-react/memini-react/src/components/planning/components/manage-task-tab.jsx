
import DiscreteDoubleTimeSlider from "../../general-components/components/discrete-double-time-slider.jsx"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { userTasksActions } from "../../../redux-memini-store.js";
import {createRef, React,  useState} from "react";
import MuiDatePicker from "../../general-components/components/mui-date-picker.jsx";

function addNewTask(userToken, title, description, year, month, day, startTime, endTime) {
        const API_URL = "http://localhost:5000/";
        const endpointURL = API_URL + "api/UserTask/AddNewTask";  


        const newTaskInformation = {          
          title : title,
          description: description,
          year: year,
          month : month,
          day  : day, 
          startTime: startTime,
          endTime: endTime
        };
        
        fetch(endpointURL, {
            method: "POST", 
            headers: {
                'Authorization': `Bearer ${userToken.userSession.token}`,
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(newTaskInformation),
        })
        .then(response => response.json())     
        .catch(error => {
            console.error("Error:", error); 
        });
}

function ManageTaskTab({providedTask}) { 
    const dispatch          = useDispatch(); 
    const titleRef = createRef();
    const descriptionRef = createRef();
    const timeIntervalRef = createRef(); 
    const taskDateRef = createRef(); 
    const userToken = useSelector((state) => state.meminiUser); 

    const onSubmitForm = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const timeInterval = timeIntervalRef.current.getValue();
        const startTime = parseInt(timeInterval[0]);
        const endTime = parseInt(timeInterval[1]);       
        const taskDate = taskDateRef.current.getPickedDate();
        
        const type = "fun";  
      //only dispatch if this is successful afterwards
        addNewTask(userToken, title, description ,taskDate.year, taskDate.month, taskDate.day, startTime, endTime);

        dispatch(userTasksActions.addTask({ Title: title, Description: description, StartTime: startTime, EndTime:endTime, Type:type, Attached: true }));
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
      placeholder="What are you planning to do?"
      variant="standard"
    />
    <TextField
      inputRef={descriptionRef}
      id="filled-multiline-static"
      label="Task description"
      multiline
      maxRows={4}
      placeholder="Describe the activity..."
      variant="standard"
    />
    <Stack direction="row" spacing={2} sx={{ ml: 2, mr:2 }}>
      <Button variant="outlined" onClick={() => {onSubmitForm()}}>Save/Update</Button>
      <Button variant="outlined" disabled>
        Delete
      </Button>
    </Stack>
  </Box>

     <div className="w-128 ml-4">
      <MuiDatePicker ref={taskDateRef} />
      
    </div>



  {/* Second row for the slider */}
  <DiscreteDoubleTimeSlider ref={timeIntervalRef} />
</Box>
        </>

    )



}

export default ManageTaskTab;