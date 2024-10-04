import React, { Component, Fragment, createRef, useContext} from "react";
import { ScheduleGridContext } from "../store/schedule-grid-context.jsx";
import { setupClockMarkers, estimateTaskStartIndex } from "../computation/computations.js";
import HorizontalScheduleMarker from "./horizontal-schedule-marker.jsx";
import Block from "./block.jsx";

class ScheduleGridManager extends Component{
    static contextType = ScheduleGridContext; 

    constructor(props){
        super(props); 
        this.state = {           
            tasks : []
        }  

        this.scheduleTimestamps         = setupClockMarkers(12);    
        this.scheduleGridRef            = createRef(null);
        this.selectedItem               = null;  
        this.activityGridSizeY          = 600; // pixels
        this.isMovingActivity           = false;
        //some mouse cursor drag start ofset when selecting item ( need better precision on drop )

    }     
                                                         
    componentDidMount() {
                  
    }

    onDrag = (item) => {
        this.selectedItem = item;  
        this.isMovingActivity = true;     
    };

    onDrop = (event) => {        
        if(this.selectedItem === (null && undefined))
            return;

        const dropTarget = event.currentTarget;
        const rect = dropTarget.getBoundingClientRect();    
        const relativeY = event.clientY - rect.top;

        const selectedObject = {
            ...this.selectedItem,           
        };

        selectedObject.startTime = Math.ceil((relativeY / rect.height) * 60 * 12);
        selectedObject.endTime = selectedObject.startTime + 60;
        selectedObject.attached = true;

        this.setState(previousState => {
            const updatedTasks = [...previousState.tasks, selectedObject];
            updatedTasks.sort((a, b) => a.timeIndex - b.timeIndex);
            return { tasks: updatedTasks };
        });

        this.horizontalScheduleMarker.setRenderMode(false);
        this.resetSelection();
    }

    resetSelection = () => {
        this.selectedItem = null;
        this.dragOverCurrentTimeBox = -1;
    }

    onDragOver = (event, blockIndex) => {
        if(!this.horizontalScheduleMarker.isRendering()) // user hovers the schedule grid
            this.horizontalScheduleMarker.setRenderMode(true);
        
        event.preventDefault();

        const container = this.scheduleGridRef.current;
        const containerRect = container.getBoundingClientRect();
        const mouseY = event.clientY - containerRect.top;;    

        this.horizontalScheduleMarker.updatePosition(mouseY);
    }

    onDragLeave = (event) => {
        if (!this.scheduleGridRef.current.contains(event.relatedTarget)) 
            this.horizontalScheduleMarker.setRenderMode(false);
    }

    render() {        
        return (
        <>       
            <div className="h-48 w-2/3">
                
                <div className="ui menu">
                    <a className="header item">
                        <i className="large rocket icon"></i>
                        Add activity
                    </a>

                    <a className="item">
                        <i className="text-blue-400 moon icon"></i>
                        
                    </a>
                    <a className="item">
                        <i className="text-orange-400 sun icon"></i>                        
                    </a>
                    <a className="item">
                        <i className="text-red-200 trash icon"></i>     
                        Clear                    
                    </a>
                    
                </div>

                <div className="ui grid">
                    <div className="twelve wide column">
                        <div className={`flex-row inline-flex activityGrid h-[${this.activityGridSizeY}]px`}>
                            <span className="w-16">
                                {
                                    this.scheduleTimestamps.map((marker, markerIndex) => {
                                        return (
                                            <Fragment key={markerIndex}>
                                                <div className="text-left italic h-[25px]" style={{marginLeft: '15px'}}>
                                                    <i className={markerIndex % 2 === 0 ? "antialiased" : "text-xs"}>{marker}</i>
                                                </div>
                                            </Fragment>
                                        );
                                    })
                                }        
                            </span>

                            <div ref={ this.scheduleGridRef } className={`w-48 schedule-task-grid`} 
                                onDragLeave ={(event) => {this.onDragLeave(event)}}                        
                                onDrop={(event) => this.onDrop(event)}
                                onDragOver={(event) => {this.onDragOver(event)}}
                            >
                            <HorizontalScheduleMarker 
                                ref={(horizontalScheduleMarker) => { this.horizontalScheduleMarker = horizontalScheduleMarker; }} >
                            </HorizontalScheduleMarker>
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

                    <div className="four wide column">
                    {
                        this.context.exampleActivityBlocks.map((task, exampleBlockIndex) => (
                            <Fragment key={exampleBlockIndex}>
                                <Block  draggable                                 
                                    content={task} 
                                    sizeY={task.endTime - task.startTime} 
                                    staticHeight={50}
                                    staticWidth={150}
                                    className={'w-48 h-[50px]'}
                                    applyActivityTypeBackground={true}
                                    onDrag={() => this.onDrag(task)} // dual setters with sizeY and staticHeight
                                />
                            </Fragment>
                    ))}
                    </div>

                </div>
                
            </div>
        </>       
        );
    }
}

export default ScheduleGridManager;








