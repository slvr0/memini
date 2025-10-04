import {TaskLayoutProps} from '../../interfaces/task-interface'
import TaskLayoutOptionPanel from '../../components/layouts/task-layout-option-panel'
import MuiStyledStatusCircle , {  } from "../../../../mui-wrappers/mui-status-circle-wrapper"
import Tooltip from '@mui/material/Tooltip';
import { Typography} from "@mui/material";

const TaskLayoutMini : React.FC<TaskLayoutProps> = (
    {
        displayOptions = true,
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

                 {
                displayOptions && 
                <div className="flex flex-row gap-0.5 ml-1 flex-shrink-0">
                    <TaskLayoutOptionPanel                                                  
                        borderProfile="rounded"
                        iconSize={11}  
                        iconOpacity={.8}                  
                    />           
                </div>
                }
            </div>
   
    )
}

export default TaskLayoutMini;