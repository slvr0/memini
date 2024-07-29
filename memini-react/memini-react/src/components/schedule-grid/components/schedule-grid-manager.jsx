import React, { Component, Fragment, createRef, useContext} from "react";

import { ScheduleGridContext } from "../store/schedule-grid-context.jsx";

import { setupClockMarkers, estimateTaskStartIndex } from "../computation/computations.js";

import Block from "./block.jsx";

class ScheduleGridManager extends Component{
    static contextType = ScheduleGridContext; 

    constructor(props){
        super(props); 
        this.state = {           
            tasks : []
        }  

        this.scheduleTimestamps     = setupClockMarkers(12);    
        this.scheduleGridRef        = createRef(null);
        this.selectedItem           = null;  
        this.dragOverCurrentTimeBox = -1;   
    }     
                                                         
    componentDidMount() {
                  
    }

    onDrag = (item) => {
        this.selectedItem = item;        
    };

    onDrop = (event) => {
        if(this.selectedItem            === (null && undefined) || 
           this.dragOverCurrentTimeBox  === (null && undefined && -1))
                return;
        
        const selectedObject = {
            ...this.selectedItem,
            timeIndex : this.dragOverCurrentTimeBox,
            
        };

        selectedObject.attached = true;

        this.setState(previousState => {
            const updatedTasks = [...previousState.tasks, selectedObject];
            updatedTasks.sort((a, b) => a.timeIndex - b.timeIndex);
            return { tasks: updatedTasks };
        });

        this.resetSelection();
    }

    resetSelection = () => {
        this.selectedItem = null;
        this.dragOverCurrentTimeBox = -1;
    }

    onDragOver = (event, blockIndex) => {
        event.preventDefault();

        if(blockIndex === this.dragOverCurrentTimeBox)
            return;
        
        this.dragOverCurrentTimeBox = blockIndex;
    }

    onDragLeave = (event) => {
        if (!this.scheduleGridRef.current.contains(event.relatedTarget)) {
            this.dragOverCurrentTimeBox = -1;
        }
    }

    render() {        
        return (
        <>
       
            <div className="ui grid h-screen flex-row">
                <div className="eight wide column">
                        {this.context.exampleActivityBlocks.map((task, exampleBlockIndex) => (
                        <Fragment key={exampleBlockIndex}>
                            <Block  draggable                                 
                                content={task} sizeY={task.endTime - task.startTime} 
                                onDrag={() => this.onDrag(task)}
                            />
                        </Fragment>
                        ))}
                </div> 

                <div className="eight wide column">
                    <div className={`h-screen flex-row inline-flex w-96 activityGrid`}>
                        <span className="w-32 activityGrid">
                            {
                                this.scheduleTimestamps.map((marker, markerIndex) => {
                                    return (
                                        <Fragment key={markerIndex}>
                                            <div className="text-xs text-center italic" style={{ height: 'calc(100% / 24)' }}>
                                                <a  className={markerIndex % 2 === 0 ? "antialiased" : "text-xs"}>{marker}</a>
                                            </div>
                                        </Fragment>
                                    );
                                })
                            }        
                        </span>
                                
                        <div ref={ this.scheduleGridRef } className={`w-64` } 
                            onDragLeave ={(event) => {this.onDragLeave(event)}}                        
                            onDrop={(event) => this.onDrop(event)}
                            >

                            { this.context.emptyGridBlocks.map((blockIndex, index) => {
                               return (
                                        <Fragment key={index}>
                                            <div className="ui row gridBLock" style={{ height: 'calc(100% / 12)' }}
                                                onDragOver={(event) => {this.onDragOver(event, blockIndex)}}
                                            >
                                                
                                                block {blockIndex}
                                            </div>
                                        </Fragment>
                                    );
                                })
                            }

                        </div>  

                        <div ref={ this.scheduleGridRef } className={`w-64 schedule-task-grid `} >
                            {
                                this.state.tasks.map((task, taskIndex) => {
                                    //const startIndex = estimateTaskStartIndex(task.startTime);

                                    const topPosition = `calc(${task.startTime} * (100% / 12))`;

                                    console.log(topPosition);

                                    return (                                        
                                        <Fragment key={taskIndex}>
                                            <Block draggable 
                                                className="attached-task"                                                
                                                content={task} sizeY={task.endTime - task.startTime}    
                                                onDrag={() => this.onDrag(task)}
                                                style={{top: '5000px'}}

                                            />
                                        </Fragment>
                                       

                                    );
                                })
                            }
                        </div>  
                    </div>
                </div>
            </div>
        </>       
        );
    }
}

export default ScheduleGridManager;








