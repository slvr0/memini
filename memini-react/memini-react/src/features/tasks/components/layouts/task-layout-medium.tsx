import {TaskLayoutProps} from '../../interfaces/task-interface'
import TaskLayoutOptionPanel from '../../components/layouts/task-layout-option-panel'
import MuiStyledStatusCircle , {  } from "../../../../mui-wrappers/mui-status-circle-wrapper"
import Tooltip from '@mui/material/Tooltip';
import { Typography} from "@mui/material";

const TaskLayoutMedium: React.FC<TaskLayoutProps> = (props) => {
  return (

    <div className="grid grid-rows-[20%_30%_50%] h-full w-full overflow-hidden"> 

        <div className="flex flex-row px-1 overflow-hidden w-full items-center align-middle">
            <MuiStyledStatusCircle status={props.status} style={{marginRight: '0.25rem'}}/>            
            <TaskLayoutOptionPanel 
                borderProfile="rounded"
                iconSize={10}  
                iconOpacity={.6}  />    
        </div>

        <div className="flex flex-row px-1 overflow-hidden w-full my-0.5">
            <Typography
            variant="subtitle2"
            fontWeight='medium'
            className="text-left w-full min-w-0 break-words"
            style={{ 
            fontSize: '11px', 
            opacity: 0.95, 
            lineHeight: '.9rem',       
            }}
            >
            {props.taskTitle}
            </Typography>            
        </div>

        <div className="flex flex-row px-1 overflow-hidden w-full my-0.5">
            <Typography
            variant="caption"
            className="text-left w-full min-w-0 break-words"
            style={{ 
            fontSize: '10px', 
            opacity: 0.8, 
            lineHeight: '.75rem',       
            }}
            >
            {props.taskTitle + (props.taskDescription ? " - " + props.taskDescription : "")}
            </Typography>
        </div>
    </div>

  );
};

export default TaskLayoutMedium;
