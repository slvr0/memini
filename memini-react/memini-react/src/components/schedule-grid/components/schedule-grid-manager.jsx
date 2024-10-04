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
        this.dragOverCurrentTimeBox = -1;  //TimeBox is a strange name 
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
            <div className="ui grid flex-row h-48">
                <div className="eight wide column">
                        {
                            this.context.exampleActivityBlocks.map((task, exampleBlockIndex) => (
                                <Fragment key={exampleBlockIndex}>
                                    <Block  draggable                                 
                                        content={task} 
                                        sizeY={task.endTime - task.startTime} 
                                        staticHeight={50}
                                        staticWidth={150}
                                        className={'gridBlock w-48 h-[50px]'}
                                        applyActivityTypeBackground={true}
                                        onDrag={() => this.onDrag(task)} // dual setters with sizeY and staticHeight
                                    />
                                </Fragment>
                        ))}
                </div> 

                <div className="eight wide column">
                    <div className={`flex-row inline-flex w-96 activityGrid h-[600px]`}>
                        <span className="w-16 activityGridTimeFrame">
                            {
                                this.scheduleTimestamps.map((marker, markerIndex) => {
                                    return (
                                        <Fragment key={markerIndex}>
                                            <div className="text-xs text-center italic h-[25px]">
                                                <a className={markerIndex % 2 === 0 ? "antialiased" : "text-xs"}>{marker}</a>
                                            </div>
                                        </Fragment>
                                    );
                                })
                            }        
                        </span>
                                
                        <div ref={ this.scheduleGridRef } className={`w-32 activityGridTimeFrame` } 
                            onDragLeave ={(event) => {this.onDragLeave(event)}}                        
                            onDrop={(event) => this.onDrop(event)}
                            >
                                { this.context.emptyGridBlocks.map((blockIndex, index) => {
                               return (
                                        <Fragment key={index}>
                                            <div className="w-32 ui row gridBlock h-[50px]"
                                                onDragOver={(event) => {this.onDragOver(event, blockIndex)}}
                                            >
                                                
                                                block {blockIndex}
                                            </div>
                                        </Fragment>
                                    );
                                })
                            }


                        </div>  

                        <div ref={ this.scheduleGridRef } className={`w-48 schedule-task-grid`} >
                            {
                                this.state.tasks.map((task, taskIndex) => {
                                    return (                                        
                                        <Fragment key={taskIndex}>
                                            <Block draggable 
                                                className="attached-task w-48"                                                
                                                content={task} sizeY={task.endTime - task.startTime}    
                                                onDrag={() => this.onDrag(task)}    
                                                applyActivityTypeBackground={true}                                          
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








