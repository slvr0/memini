import "../css/task.css";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import Tooltip from '@mui/material/Tooltip';
import type { Task } from "../interfaces/task-types";  
import React from "react";                      

interface DisplayTaskProps {
    task: Task;
}

const DisplayTask : React.FC<DisplayTaskProps> = (props : any) => {
  const content = props.task;
  const isCompressed = (content.EndTime - content.StartTime) < 60;
  const containerType = !isCompressed ? 'task-container' : 'task-container-compressed';
  const tooltip = content.Title + " - " + content.Description + " , scheduled between " + (content.StartTime / 60).toString() + " and " +(content.EndTime / 60).toString();

  return (
    <>   
        <Tooltip title={tooltip|| ''}arrow>
            <div className={`${containerType} `}>
            <div className="icon-edit icon-container">
                <EditNoteRoundedIcon></EditNoteRoundedIcon>        
            </div>
            <div className="icon-delete icon-container">
                <DeleteForeverRoundedIcon></DeleteForeverRoundedIcon>
            </div>
                {isCompressed && (
                <>
                    <div className="title-description-compressed">{content.Title} - {content.Description}</div>
                </>
                )}

                {!isCompressed && (
                <>
                    <div className="title">{content.Title}</div>
                    <div className="description">{content.Description}</div>
                </>
                )}
            
            </div>
        </Tooltip>
    </>
    
  );
};

export default DisplayTask;

