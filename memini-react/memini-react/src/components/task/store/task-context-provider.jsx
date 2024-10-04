import React, { Component } from 'react';
import { TaskContext } from './task-context.jsx';


//unique for each task, probably not the best use of global context object
class TaskContextProvider extends Component {  
   
    taskTypeBackgroundColors = {
        'sport' : 'bg-red-300',
        'chore' : 'bg-yellow-300',
        'fun'   : 'bg-indigo-300'
    };

    taskTypeIcons = {
        'sport' : 'blue table tennis icon',
        'chore' : 'gray shopping cart icon',
        'fun'   : 'yellow bowling ball icon'
    };

    constructor(props) {
        super(props);   

        this.state = {       
            backgroundColor : this.taskTypeBackgroundColors[this.props.taskType],
            taskIcon : this.taskTypeIcons[this.props.taskType]            
        };
    } 

    

    render() {
    return (
        <TaskContext.Provider value={this.state}>
            {this.props.children}
        </TaskContext.Provider>
        );
    }

}

export default TaskContextProvider;