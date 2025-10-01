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
    
            <div className="h-full w-full p-1 overflow-hidden flex items-center justify-between min-h-0">
                <MuiStyledStatusCircle status={props.status} style={{marginRight: '0.25rem'}}/>     

                <Typography 
                    variant="subtitle2" 
                    className="font-semibold opacity-95 flex-1 truncate text-ellipsis whitespace-nowrap" 
                    style={{
                        color: 'black', 
                        fontSize: '10px',
                        letterSpacing: '.025rem',
                        minWidth: 0
                    }}
                > 
                {props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )}
                </Typography>

                 {
                displayOptions && 
                <div className="flex flex-row gap-0.5 ml-1 flex-shrink-0">
                    <TaskLayoutOptionPanel                                                  
                        borderProfile="rounded"
                        iconSize={10}  
                        iconOpacity={.6}                  
                    />           
                </div>
                }
            </div>
   
    )
}

export default TaskLayoutMini;