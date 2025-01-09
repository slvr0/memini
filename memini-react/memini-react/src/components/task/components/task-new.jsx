import React from 'react';

const taskTypeIcons = {
    'sport' : 'basketball ball',
    'chore' : 'shopping cart',
    'fun'   : 'bowling ball'
};

const TaskNew = (props) => {

    const content           = props.content;   

    const getTaskIconClass = (taskType) => {
        const taskTypeIcon = taskTypeIcons[taskType];
      
        return 'ui icon memini-icon ' +  taskTypeIcon;
    }

    return (
    <>
 

 <div className="grid-container">
    <div className="grid-item time-stamp-start task-display-time-marker">{props.content.startTimeDisplay}</div>
    <div className="grid-item title">{props.content.title}</div>
    <div className="grid-item description">{props.content.description}</div>
    <div className="grid-item time-stamp-end task-display-time-marker">{props.content.endTimeDisplay}</div>
    <div className="grid-item item5">
        <i className={getTaskIconClass(content.type)}></i> 
    </div>
</div>  
   
    
    </>);
}

export default TaskNew;