import React, { Fragment, useEffect, createRef,useState, useRef } from "react";
import QuoteSegment from "../../general/components/quote-segment";
import PlanningMainDashboard from './planning-main-dashboard'
import TrackingTasksTab from "./tracking-tasks-tab";
import TaskSchedulerContainer from "./task-scheduler/task-scheduler-container";

import MuiModal from "../../general/components/mui-modal";
import { MuiModalRef } from "../../general/interfaces/general-types";
import EditTaskForm from "./edit-task-form";
import { MuiDatePickerRef } from "../../general/interfaces/general-types";
import MuiDatePicker from "../../general/components/mui-date-picker";
import { Typography, Box } from "@mui/material";
import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText } from "lucide-react";

function PlanningPage() {    
    const modifyTaskRef = createRef<MuiModalRef>(); 
    const taskDateRef   = createRef<MuiDatePickerRef>();
    const schedulerParentRef = useRef(null); //clear name convention, this is to calculate if scroll is needed, not to be used for imperative handling.

    const SCHEDULER_CONTAINER_STATIC_HEIGHT = 750;
    const TIME_SLOT_STATIC_HEIGHT = SCHEDULER_CONTAINER_STATIC_HEIGHT * 0.0416666666666667; 

    return <> 
         <MuiModal
            ref={modifyTaskRef}         
            onClose={() => {}}
            onAction={() => {}}
            modalTitle="Edit Task"
            actionLabel="Save"
            cancelLabel="Cancel"        
            >
            <EditTaskForm modalWrapper={modifyTaskRef as React.RefObject<MuiModalRef>}></EditTaskForm>
        </MuiModal> 


        <div className="h-screen bg-white">
            <div className="grid grid-cols-12 h-full">
                <div className="col-span-2 border-r border-r-gray-200 h-full">

                </div>

                <div className="col-span-10 border-r border-r-gray-200 h-full">
                    <div className="scheduler-content-header h-20 p-2 border-b border-b-bg-gray-100">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mx-4">
                            <Typography variant="h5" className="m-4 font-semibold opacity-80">
                            Planning
                            </Typography>

                            <MuiDatePicker 
                            defaultDate={null} 
                            ref={taskDateRef} 
                            />
                        </div>                    
                    </div>

                    <div className="overflow-y-scroll">
                        <div className="h-12 grid grid-cols-[5%_19%_19%_19%_19%_19%] items-center text-center border-b border-b-gray-100 sticky top-0 bg-white z-10">            
                            <div className="flex flex-col justify-center h-full border-r border-r-gray-100 overflow-hidden ">
                                <Typography variant="overline" className="truncate opacity-85">
                                    Week 38
                                </Typography>
                            </div>

                
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, i) => (
                                <div
                                key={i}
                                className="flex flex-col items-center justify-center h-full overflow-hidden border-r border-r-gray-100"
                                >
                                    <Typography variant="overline" className="truncate opacity-85">
                                        {day}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                        
                        <div ref={schedulerParentRef}>
                            <TaskSchedulerContainer
                                displayAsWeek={true}
                                schedulerHeight={SCHEDULER_CONTAINER_STATIC_HEIGHT}
                                timeslotHeight={TIME_SLOT_STATIC_HEIGHT}
                                ref={schedulerParentRef}>  
                            </TaskSchedulerContainer>                    
                        </div>
                    </div>

                    

                   
                </div> 
            </div>
        </div>
       
        
    </>

}


export default PlanningPage;