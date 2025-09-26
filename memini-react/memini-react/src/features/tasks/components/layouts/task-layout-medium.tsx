import {TaskLayoutProps} from '../../interfaces/task-interface'
import TaskLayoutOptionPanel from '../../components/layouts/task-layout-option-panel'
import MUI_StyledStatusCircle , {  } from "../../../../mui-wrappers/mui-status-circle-wrapper"
import Tooltip from '@mui/material/Tooltip';
import { Typography} from "@mui/material";

const TaskLayoutMedium: React.FC<TaskLayoutProps> = (props) => {
  return (
    <Tooltip
      title={
        props.taskTitle +
        (props.taskDescription ? " - " + props.taskDescription : "")
      }
      arrow
    >
    <div className="grid grid-rows-[20%_30%_50%] h-full w-full overflow-hidden"> 

        <div className="flex flex-row px-1 overflow-hidden w-full items-center align-middle">
            <MUI_StyledStatusCircle status={props.status} style={{marginRight: '0.25rem'}}/>            
            <TaskLayoutOptionPanel 
                borderProfile="rounded"
                iconSize={10}  
                iconOpacity={.6}  />    
        </div>

        <div className="flex flex-row px-1 overflow-hidden w-full my-0.5">
            <Typography
            variant="overline"
            className="text-left w-full min-w-0 break-words"
            style={{ 
            fontSize: '10px', 
            opacity: 0.95, 
            lineHeight: '.75rem',       
            }}
            >
            {props.taskTitle + (props.taskDescription ? " - " + props.taskDescription : "")}
            </Typography>            
        </div>

        <div className="flex flex-row px-1 overflow-hidden w-full my-0.5">
            <Typography
            variant="subtitle2"
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
    </Tooltip>
  );
};

export default TaskLayoutMedium;
