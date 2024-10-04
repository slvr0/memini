import React, { Component } from "react";

import DisplayTaskMicro     from "./display-task-micro";
import DisplayTaskSmall     from "./display-task-small";
import DisplayTaskMedium    from "./display-task.medium";
import DisplayTaskLarge     from "./display-task-large";
import EditDisplayTask      from "./edit-display-task";

import TaskContextProvider from "../store/task-context-provider.jsx";

const TaskSize = {
    MICRO   : 'micro',
    SMALL   : 'small',
    MEDIUM  : 'medium',
    LARGE   : 'large'
};

const DisplayMicroTask = (params) => (
    <DisplayTaskMicro params={params}> </DisplayTaskMicro>
);

const DisplaySmallTask = (params) => (
    <DisplayTaskSmall params={params}> </DisplayTaskSmall>
);

const DisplayMediumTask = (params) => (
    <DisplayTaskMedium params={params}> </DisplayTaskMedium>
);

const DisplayLargeTask = (params) => (
    <DisplayTaskLarge params={params}> </DisplayTaskLarge>
);

const displayComponents = {
    [TaskSize.MICRO]    : DisplayMicroTask,
    [TaskSize.SMALL]    : DisplaySmallTask,
    [TaskSize.MEDIUM]   : DisplayMediumTask,
    [TaskSize.LARGE]    : DisplayLargeTask
};

const taskTypeIcons = {
    'sport' : 'blue table tennis icon',
    'chore' : 'gray shopping cart icon',
    'fun'   : 'yellow bowling ball icon'
};

class Task extends Component {

    constructor(props){
        super(props); 

        
    }
    
    componentDidMount() {
      
    }

    calculateTaskSize(blockHeight) {
        return TaskSize.MICRO;

   
        // const hourFractionalHeight = blockHeight / 60.0;

        if(blockHeight > 200)   return TaskSize.LARGE;
        if(blockHeight >= 140)  return TaskSize.MEDIUM;
        if(blockHeight >= 70)   return TaskSize.SMALL;
        return TaskSize.MICRO;
    }

    onEditDisplayUpdate(callback) {
        callback(this);
    }

    onDisplayEditUpdate() {

    }

    onCloseDisplayEditUpdate() {

    }
    
  render() { 

        //const taskDisplaySize   = this.calculateTaskSize(this.props.dimensions.width, this.props.dimensions.height);
        const taskDisplaySize   = this.calculateTaskSize(this.props.height);
        const content           = this.props.content;
        const DisplayComponent  = displayComponents[taskDisplaySize]; 
        const taskIcon          = taskTypeIcons[this.props.content.type];  
        const height            = this.props.height;

        return (
          <> 
            <span>
        
                <DisplayComponent 
                    content={content} 
                    taskIcon={taskIcon} 
                    height={height}           
                > 
                </DisplayComponent>      
             
            </span>
          </>
        );
    }
}

export default Task;








