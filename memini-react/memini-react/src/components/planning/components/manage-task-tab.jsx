
import DiscreteDoubleTimeSlider from "../../general-components/components/discrete-double-time-slider.jsx"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { userTasksActions } from "../../../redux-memini-store.js";
import {createRef, React,  useState} from "react";

function ManageTaskTab() { 
    const dispatch          = useDispatch(); 
    const titleRef = createRef();
    const descriptionRef = createRef();
    const timeIntervalRef = createRef();  

    const onSubmitForm = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const timeInterval = timeIntervalRef.current.getValue();
        const startTime = parseInt(timeInterval[0]);
        const endTime = parseInt(timeInterval[1]);
        // console.log(timeIntervalRef.current.getValue()); // [480, 1020]
        // console.log(timeIntervalRef.current.getValueAsTime()); // ["08:00", "17:00"]


        // console.log(title, description, timeInterval);

        // const startTime = parseInt(formData.startTime);
        // const endTime = parseInt(formData.endTime);
        const type = "fun";
        
        console.log(startTime, endTime);
        dispatch(userTasksActions.addTask({ title: title, description: description, startTime: startTime, endTime:endTime, type:type, attached: true }));

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

  {/* Second row for the slider */}
  <DiscreteDoubleTimeSlider ref={timeIntervalRef} />
</Box>
        </>

    )



}

export default ManageTaskTab;