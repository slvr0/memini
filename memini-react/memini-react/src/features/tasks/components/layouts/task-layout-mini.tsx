import {TaskLayoutProps} from '../../interfaces/task-interface'
import TaskLayoutOptionPanel from '../../components/layouts/task-layout-option-panel'

import Tooltip from '@mui/material/Tooltip';
import { Typography} from "@mui/material";

const TaskLayoutMini : React.FC<TaskLayoutProps> = (props) => {    
    return (
        <Tooltip title={props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )} arrow>
            <div className="h-full w-full p-1 overflow-hidden flex items-center justify-between min-h-0">
                <Typography 
                    variant="caption" 
                    className="opacity-85 flex-1 truncate text-ellipsis whitespace-nowrap" 
                    style={{
                        color: 'black', 
                        fontSize: '11px',
                        letterSpacing: '.025rem',
                        minWidth: 0
                    }}
                > 
                    { props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' ) }
                </Typography>
                
                <div className="flex flex-row gap-0.5 ml-1 flex-shrink-0">
                    <TaskLayoutOptionPanel                                                  
                        borderProfile="rounded"
                        iconSize={12}  
                        iconOpacity={.8}                  
                    />
           
                </div>
            </div>
        </Tooltip>
    )
}

export default TaskLayoutMini;