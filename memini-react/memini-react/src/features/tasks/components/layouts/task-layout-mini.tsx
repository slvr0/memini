import {TaskLayoutProps} from '../../interfaces/task-interface'
import TaskLayoutOptionPanel from '../../components/layouts/task-layout-option-panel'
import MuiStyledStatusCircle , {  } from "../../../../mui-wrappers/mui-status-circle-wrapper"
import Tooltip from '@mui/material/Tooltip';
import { Typography} from "@mui/material";

const TaskLayoutMini : React.FC<TaskLayoutProps> = (
    {     
        ...props
    }
) => {    
    return (
    
            <div className="h-full w-full p-1 overflow-hidden flex items-start min-h-0">
                             
                <Typography
                variant="caption"
                className="text-left w-full min-w-0 break-words"
                color="text.secondary"
                style={{ 
                fontSize: '9px',             
                lineHeight: '.75rem',       
                }}
                >
                {props.displayTime} 
                </Typography>  

                <Typography
                    variant="body2"
                    fontWeight='medium'
                    className="text-left w-full min-w-0 break-words"
                    style={{ 
                    fontSize: '9px',  
                    lineHeight: '.7rem',       
                    }}
                    >
                    {props.taskTitle}
                </Typography>
                 
            </div>
   
    )
}

export default TaskLayoutMini;