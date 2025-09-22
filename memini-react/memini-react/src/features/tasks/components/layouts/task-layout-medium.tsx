import {TaskLayoutProps} from '../../interfaces/task-interface'
import TaskLayoutOptionPanel from '../../components/layouts/task-layout-option-panel'
import MUI_StyledStatusCircle , {  } from "../../../../mui-wrappers/mui-status-circle-wrapper"
import MUI_StyledSegment from "../../../../mui-wrappers/mui-segment-wrapper"

import Tooltip from '@mui/material/Tooltip';
import { Typography} from "@mui/material";

const TaskLayoutMedium : React.FC<TaskLayoutProps> = (props) => {
    return (
        <Tooltip title={props.taskTitle  +  (props.taskDescription ? ' - ' + props.taskDescription : '' )} arrow>
            <div className="grid grid-rows-[20%_30%_50%] h-full items-center mx-2 my-2">
                <div className="flex flex-row gap-2 m-2 justify-between items-center">
                        <MUI_StyledStatusCircle color="blue" size={8} ></MUI_StyledStatusCircle>
                        <div className="flex flex-row gap-2">
                             <MUI_StyledSegment spacing="segmentMini" borderProfile="rounded">  
                                <TaskLayoutOptionPanel                                 
                                    iconSize={14}  
                                    iconOpacity={.6}                  
                                />
                   
                            </MUI_StyledSegment>   
                        </div>
                                                   
                </div>  
                <div className="flex flex-row gap-2 m-2 justify-start">
                    <Typography variant="overline" className="font-semibold opacity-95 m-2 overflow-hidden" style={{color:''}}> 'Size MD' {props.taskTitle}</Typography>
                </div>  
                <div className="flex flex-row gap-2 m-2 justify-start truncate overflow-hidden whitespace-nowrap">
                    <Typography 
                        variant="caption" 
                        className="font-semibold opacity-95 m-2 overflow-ellipsis wrap-break-word break-all"
                        > 
                        {props.taskTitle + (props.taskDescription ? ' - ' + props.taskDescription : '')}
                    </Typography> 
                </div> 
            </div>
    </Tooltip>)
}

export default TaskLayoutMedium;