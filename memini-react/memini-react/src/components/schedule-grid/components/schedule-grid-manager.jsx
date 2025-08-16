import React, { Fragment, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';

import { setupClockMarkers } from "../computation/computations.js";
import { meminiUserActions, userTasksActions } from "../../../redux-memini-store.js";
import Block from "./block.jsx";
import { getUserTasks } from "../../../services/usertask-service.js";

//TODO: global load, we dont want to initiate everytime ( use Effect instead? )
const hoursPerScheduleGrid       = 24;
let scheduleTimestamps         = setupClockMarkers(hoursPerScheduleGrid, false); //TODO: should be moved to redux, should be moved to useEffect

const  ScheduleGridManager = () => {

    const dispatch  = useDispatch();
    const userTasks = useSelector((state) => state.userTasks.userTasks);
    const userToken = useSelector((state) => state.meminiUser); 
    const selectedDate = useSelector((state) => state.calendarDate.selectedDate);    
    const activityGridSizeY          = 1200; // pixels

    const hasFetchedRef = React.useRef(false);

    useEffect(() => {
    if (!selectedDate) return;
    
    getUserTasks({ year: selectedDate.year, month: selectedDate.month, day: selectedDate.day })
        .then(response => {              
            dispatch(userTasksActions.setTasks(response.data.ResponseObject));
        })
        .catch(err => console.error(err));
    }, [selectedDate, dispatch]);

    const onClickTask = (task) => {       
        dispatch(userTasksActions.setSelectedTask(task));
    }

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
                                    onClick={() => onClickTask(task)}
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








