import React, { Component, Fragment, createRef, useState, useRef} from "react";
import { ScheduleGridContext } from "../store/schedule-grid-context.jsx";
import { setupClockMarkers, estimateTaskStartIndex } from "../computation/computations.js";
import HorizontalScheduleMarker from "./horizontal-schedule-marker.jsx";
import CalendarSelectedDate from "../../calendar/components/calendar-selected-date.jsx";
import {convertHourMinutesToDisplayTime, timestampDisplay} from "../../task/computations/time-display-formatting.js";
import NewActivityModal from "./new-activity-modal.jsx";

import Block from "./block.jsx";

const  ScheduleGridManager = () => {
    const exampleActivityBlocks = [
        {
            title : 'Tennis', 
            type : 'sport', 
            description : 'Play tennis on clay with Oliver 1h',
            startTime : 300,
            endTime : 360,
            attached : false
        },
        {
            title : 'Do Laundry',
            type : 'chore',
            description : 'Take care of the laundry, wash your dirty jeans 3h',
            startTime : 400,
            endTime: 580,
            attached : false
        },
        {
            title : 'Watch Avengers',
            type : 'fun',
            description : 'Its supposed to be a great movie, i know you dont enjoy superhero movies in general but give it a shot! 2h',
            startTime : 600,
            endTime: 720,
            attached : false
        }
    ];

    const hoursPerScheduleGrid       = 24;
    const scheduleTimestamps         = setupClockMarkers(hoursPerScheduleGrid, false); 
    let scheduleGridRef              = useRef(null);  
    let horizontalScheduleMarker     = useRef(null);
    let newActivityModal             = useRef(null);
    const activityGridSizeY          = 1200; // pixels

    let selectedItem = null;  

    const [tasks, setTasks] = useState([]);      
    
    const onDrag = (item = null) => {
        selectedItem = item;  
        horizontalScheduleMarker.current.onSetIsDragging(true); 
    };


    const onCloseNewActivityModal = () => {

    }

    //this is abit complicated do something to nest it out
    const onDrop = (event) => {  
        
        const dropTarget = event.currentTarget;
        const rect = dropTarget.getBoundingClientRect();
        const scrollTop = dropTarget.scrollTop;
        // Correct mouse position inside the element, accounting for scroll
        const relativeY = event.clientY + scrollTop - rect.top;

        //new activity is being created
        if(selectedItem === (null && undefined)){
            const startTime = Math.ceil((relativeY / rect.height) * 60 * hoursPerScheduleGrid);            
            newActivityModal.current.onShowModal(startTime);
            return;
        } 

        // const selectedObject = structuredClone({
        //     ...selectedItem, 
        // });


        console.log(selectedItem);
        //how do we know if its a new one or existing drag?

        

        const selectedObject = exampleActivityBlocks[0]; // for testing 
        
        // Update properties of the cloned object
        selectedObject.startTime = Math.ceil((relativeY / rect.height) * 60 * hoursPerScheduleGrid);
        selectedObject.startTimeDisplay = timestampDisplay(selectedObject.startTime);

        selectedObject.endTime = selectedObject.startTime + 60;
        selectedObject.endTimeDisplay = timestampDisplay(selectedObject.endTime);
        selectedObject.attached = true;
        
        // Update the tasks array
        setTasks((previousTasks) => {
            const updatedTasks = [
                ...(previousTasks || []),
                selectedObject
            ].sort((a, b) => a.startTime - b.startTime);
            
            return  updatedTasks;
        });
        
        horizontalScheduleMarker.current.onSetIsDragging(false);   
        horizontalScheduleMarker.current.onSetIsRendering(false);
        resetSelection();
    }

    const onDragOver = (event) => {
        event.preventDefault();        
        if (scheduleGridRef.current.contains(event.target)) 
            horizontalScheduleMarker.current.onSetIsRendering(true);

        const container     = scheduleGridRef.current;
        const containerRect = container.getBoundingClientRect();
        const mouseY        = event.clientY - containerRect.top;

        horizontalScheduleMarker.current.onSetPositionY(mouseY);
    }

    const onDragLeave = (event) => {
        if (!scheduleGridRef.current.contains(event.relatedTarget)) 
            horizontalScheduleMarker.current.onSetIsRendering(false);
    } 

    const resetSelection = () => {
        selectedItem = null;
    }

    return (
    <>      
    <NewActivityModal ref={newActivityModal}></NewActivityModal>
    <div className="calendar-container">
        <div className="ui row">
            <div className="ui grid">
                <div className="four wide column schedule-grid-menu-block">
                    <Block onDrag={() => {onDrag()}}>
                    </Block>                    
                </div> 
                 

                <div className="eight wide column schedule-grid-menu-block">
                    <CalendarSelectedDate className={'schedule-grid-selected-day'}></CalendarSelectedDate>
                </div>

                <div className="four wide column schedule-grid-menu-block">                                      
                    <i className="ui icon sync alternate large memini-icon memini-icon-large interactive schedule-grid-menu-partofday-icon"></i>    
                    <i className="ui icon bookmark outline large memini-icon memini-icon-large interactive schedule-grid-menu-partofday-icon"></i> 
                    <i className="ui icon cogs large memini-icon memini-icon-large interactive schedule-grid-menu-partofday-icon"></i>  
                </div>    
            </div>
        </div> 

        <div className="ui divider"></div>
        
        <div className="ui row">        
            <div className="fourteen wide column schedule-task-grid scrollable-div">
            <HorizontalScheduleMarker ref={horizontalScheduleMarker} /> 
                <div className={`h-[${activityGridSizeY}]px`} style={{ display: 'flex' }}>
                    {/* Time Marker Column */}
                    <div className="" style={{ width: '64px', display: 'flex', flexDirection: 'column' }}>
                    
                        {scheduleTimestamps.map((marker, markerIndex) => (
                            <Fragment key={markerIndex}>
                                <div className="h-[25px]" style={{ marginLeft: '15px' }}>
                                    <p className={markerIndex % 2 === 0 ? "schedule-grid-timemark-whole" : "schedule-grid-timemark-half"}>{marker}</p>
                                </div>
                            </Fragment>
                        ))}

                    </div>

                    {/* Schedule Task Grid */}
                    <div 
                        ref={scheduleGridRef} 
                        className=""
                        style={{ flexGrow: 1, minHeight: '150px', border: '' }}
                        onDragLeave={onDragLeave}                        
                        onDrop={(event) => onDrop(event)}
                        onDragOver={(event) => { onDragOver(event); }}
                    >  
                                                                         

                        {tasks.length === 0 && (
                            <div style={{ textAlign: 'center', color: 'gray' }}></div>
                        )}                    
                        {tasks.map((task, taskIndex) => (
                            <Fragment key={taskIndex}>
                                <Block 
                                    draggable
                                    content={task} 
                                    className="attached-task w-48"       
                                    onDrag={() => onDrag(task)}    
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
    </>       
    );
    
}

export default ScheduleGridManager;








