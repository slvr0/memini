import "../css/task-new.css";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import Tooltip from '@mui/material/Tooltip';

const TaskNew = (props) => {
  const { content } = props;
  const isCompresedTask = (content.EndTime - content.StartTime) < 60;
  const containerType = !isCompresedTask ? 'task-container' : 'task-container-compressed';
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
                {isCompresedTask && (
                <>
                    <div className="title-description-compressed">{content.Title} - {content.Description}</div>
                </>
                )}

                {!isCompresedTask && (
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

export default TaskNew;

