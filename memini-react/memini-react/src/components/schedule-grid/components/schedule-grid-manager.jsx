import React, { Component, Fragment, createRef, useContext} from "react";
import { ScheduleGridContext } from "../store/schedule-grid-context.jsx";
import { setupClockMarkers, estimateTaskStartIndex } from "../computation/computations.js";
import HorizontalScheduleMarker from "./horizontal-schedule-marker.jsx";
import TodaysDate from "../../calendar/components/todays-date.jsx";

import Block from "./block.jsx";

class ScheduleGridManager extends Component{
    static contextType = ScheduleGridContext; 

    constructor(props){
        super(props); 
        this.state = {           
            tasks : []
        }  

        this.hoursPerScheduleGrid = 24;

        this.scheduleTimestamps           = setupClockMarkers(this.hoursPerScheduleGrid, false);    

        this.scheduleGridRef            = createRef(null);
        this.selectedItem               = null;  
        this.activityGridSizeY          = 1200; // pixels
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
        const scrollTop = dropTarget.scrollTop;

        // Correct mouse position inside the element, accounting for scroll
        const relativeY = event.clientY + scrollTop - rect.top;

        const selectedObject = {
            ...this.selectedItem,           
        };

        selectedObject.startTime = Math.ceil((relativeY / rect.height) * 60 * this.hoursPerScheduleGrid);

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
            <div className="ui row">
                <h2 class="ui center aligned icon header">
                <i class="circular users icon schedule-grid-content-main-background-low"></i>
                Schedule
                </h2>
                
                <div className="ui grid">
                    <div className="fourteen wide column">
                        <div className="ui menu">
                            <a className="header item schedule-grid-content-main-background-intense">
                                <i className="large rocket icon"></i>
                                Add activity
                            </a>

                            <a className="item">
                                <TodaysDate></TodaysDate>
                            </a>   

                            <a className="item">
                                <i class="cloud icon large"></i>                    
                            </a>

                            <a className="item">
                                <i class="sun icon large"></i>                    
                            </a>

                            <a className="item">
                                <i class="moon icon large"></i>                    
                            </a>
                            
                        </div>
                    </div>

                    <div className="two wide column">                    
                       
                    </div>  

                </div>
                

                <div className="ui grid">
                    <div className="fourteen wide column schedule-task-grid scrollable-div">
                        <HorizontalScheduleMarker ref={(marker) => { this.horizontalScheduleMarker = marker; }} />

                        <div className={`activityGrid h-[${this.activityGridSizeY}]px`} style={{ display: 'flex' }}>
                            {/* Time Marker Column */}
                            <div className="schedule-grid-content-main-background-low" style={{ width: '64px', display: 'flex', flexDirection: 'column' }}>
                                {this.scheduleTimestamps.map((marker, markerIndex) => (
                                    <Fragment key={markerIndex}>
                                        <div className="h-[25px]" style={{ marginLeft: '15px' }}>
                                            <p className={markerIndex % 2 === 0 ? "schedule-grid-timemark-whole" : "schedule-grid-timemark-half"}>{marker}</p>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>

                            {/* Schedule Task Grid */}
                            <div 
                                ref={this.scheduleGridRef} 
                                className=""
                                style={{ flexGrow: 1, minHeight: '150px', border: '1px dashed lightgray' }} // Make the task grid expand properly
                                onDragLeave={this.onDragLeave}                        
                                onDrop={(event) => this.onDrop(event)}
                                onDragOver={(event) => { event.preventDefault(); this.onDragOver(event); }}
                            >                                

                                {this.state.tasks.length === 0 && (
                                    <div style={{ textAlign: 'center', color: 'gray' }}></div>
                                )}

                                {this.state.tasks.map((task, taskIndex) => (
                                    <Fragment key={taskIndex}>
                                        <Block 
                                            draggable
                                            className="attached-task w-48"
                                            content={task} 
                                            sizeY={task.endTime - task.startTime}    
                                            onDrag={() => this.onDrag(task)}    
                                            applyActivityTypeBackground={true}
                                        />
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="two wide column">
                    
                       
                    </div>                    
                </div>                
            </div>
            <div className="schedule-grid-recommended-activities-area" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-start', alignItems: 'center' }}>
                {this.context.exampleActivityBlocks.map((task, exampleBlockIndex) => (
                    <div key={exampleBlockIndex} style={{ display: 'flex', flexDirection: 'column', width: '150px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px', boxSizing: 'border-box' }}>
                        <div className="middle aligned content">
                            <Block 
                                draggable
                                content={task} 
                                sizeY={task.endTime - task.startTime} 
                                staticHeight={50}
                                staticWidth={150}
                                className={'w-48 h-[50px]'}
                                applyActivityTypeBackground={true}
                                onDrag={() => this.onDrag(task)} 
                            />
                        </div>
                    </div>
                ))}
            </div>

        </>       
        );
    }
}

export default ScheduleGridManager;








