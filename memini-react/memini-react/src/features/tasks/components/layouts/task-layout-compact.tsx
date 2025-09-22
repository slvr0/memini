import {TaskLayoutProps, DisplayTaskProps} from '../../interfaces/task-interface'
import TaskLayoutOptionPanel from '../../components/layouts/task-layout-option-panel'
import Tooltip from '@mui/material/Tooltip';
import { Typography } from "@mui/material";

const TaskLayoutCompact : React.FC<TaskLayoutProps> = (
    {
        displayOptions = true,
        ...props
    }

) =>{    
    return (
        <Tooltip title={props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )} arrow>
            <div className="h-full w-full p-1 overflow-hidden flex items-center justify-between min-h-0">
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
                  'COMPACT'  {props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )}
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
        </Tooltip>
    )
}

export default TaskLayoutCompact;