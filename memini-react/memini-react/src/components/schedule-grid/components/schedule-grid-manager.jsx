import React, { Component, Fragment, createRef, useState, useRef, useEffect} from "react";
import { ScheduleGridContext } from "../store/schedule-grid-context.jsx";
import { setupClockMarkers, estimateTaskStartIndex } from "../computation/computations.js";
import HorizontalScheduleMarker from "./horizontal-schedule-marker.jsx";
import CalendarSelectedDate from "../../calendar/components/calendar-selected-date.jsx";
import {convertHourMinutesToDisplayTime, timestampDisplay} from "../../task/computations/time-display-formatting.js";


import { meminiUserActions, userTasksActions } from "../../../redux-memini-store.js";
import {useSelector, useDispatch} from 'react-redux';

import Block from "./block.jsx";

const hoursPerScheduleGrid       = 24;
let scheduleTimestamps         = setupClockMarkers(hoursPerScheduleGrid, false); //TODO: should be moved to redux 


const fetchTasksForDate = async (userToken, year, month, day) => {
  const API_URL = "http://localhost:5000/";
  const endpointURL = API_URL + "api/UserTask/GetTasksForDate";  

  const formData = { year, month, day };

  try {
    const response = await fetch(endpointURL, {
      method: "POST", 
      headers: {
        'Authorization': `Bearer ${userToken}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data.tasks.Tasks;

  } catch (error) {
    console.error("Error:", error); 
    throw error;
  }
};

const  ScheduleGridManager = () => {

    const dispatch  = useDispatch();
    const userTasks = useSelector((state) => state.userTasks.userTasks);
    const userToken = useSelector((state) => state.meminiUser); 
    const selectedDate = useSelector((state) => state.calendarDate).selectedDate;    

    useEffect(() => {
        if (!selectedDate) return;

        const fetchTasks = async () => {
            let updatedTasks = await fetchTasksForDate(userToken.userSession.token, selectedDate.year, selectedDate.month, selectedDate.day);

            dispatch(userTasksActions.setTasks(updatedTasks));
        };
        fetchTasks();
    }, [selectedDate]);
    
    const activityGridSizeY          = 1200; // pixels

    return (
    <>      

    <div className="calendar-container">
            <div className="fourteen wide column schedule-task-grid scrollable-div">
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
                        
                        className=""
                        style={{ flexGrow: 1, minHeight: '150px', border: '' }}                        
                    >  
                        {userTasks.length === 0 && (
                            <div style={{ textAlign: 'center', color: 'gray' }}></div>
                        )}                    
                        {userTasks.map((task, taskIndex) => (
                            <Fragment key={taskIndex}>
                                <Block 
                                    draggable
                                    content={task} 
                                    className="attached-task"   
                                    applyActivityTypeBackground={false} //no effect.
                                />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
    </div> 
    </>       
    );
    
}

export default ScheduleGridManager;








