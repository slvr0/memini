import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const MultilineTextField : React.FC = (props: any) => {
    return (<>

    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 2, width:250 } }}
      noValidate
      autoComplete="off"
    >
    <TextField
          ref={props.ref}
          id="filled-multiline-static"
          
          label={props.label}
          multiline
          maxRows={4}
          placeholder={props.placeholder}         
          variant="standard"
        />
    </Box>
        
    </>)
}

export default MultilineTextField;