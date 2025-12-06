import {TaskLayoutProps} from '../../interfaces/task-interface'
import TaskLayoutOptionPanel from '../../components/layouts/task-layout-option-panel'
import MuiStyledStatusCircle , {  } from "../../../../mui-wrappers/mui-status-circle-wrapper"
import Tooltip from '@mui/material/Tooltip';
import { Typography} from "@mui/material";

const TaskLayoutMedium: React.FC<TaskLayoutProps> = (props) => {
  return (

    <div className="grid grid-rows-[25%_35%_40%] h-full w-full overflow-hidden"> 
        <div className="flex flex-row overflow-hidden w-full mt-0.5">        
            <div className="flex flex-row  items-start ml-1 gap-0.5">   

              <Typography
                  variant="caption"
                  className="text-left w-full min-w-0 break-words"
                  color="text.secondary"
                  style={{ 
                  fontSize: '11px',             
                  lineHeight: '.75rem',       
                  }}
                  >
                  {props.displayTime}
                </Typography>        
            </div> 
        </div>


        <div className="flex flex-row overflow-hidden w-full items-start justify-start mt-0.5 ml-1">
            <Typography
            variant="body2"
            fontWeight='medium'
            className="text-left w-full min-w-0 break-words"
            style={{ 
              lineHeight: '.9rem',       
              }}
            >
              {props.taskTitle}
            </Typography>            
        </div>

        <div className="flex flex-row overflow-hidden w-full my-0.5 items-start justify-start ml-1">
            <Typography
            variant="caption"
            className="text-left w-full min-w-0 break-words"
            color="text.secondary"
            style={{ 
            fontSize: '11px',             
            lineHeight: '.75rem',       
            }}
            >
            {props.taskDescription}
            </Typography>
        </div>
    </div>

  );
};

export default TaskLayoutMedium;
