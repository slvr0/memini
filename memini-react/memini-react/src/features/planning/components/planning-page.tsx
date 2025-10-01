import React, { Fragment, useEffect, createRef,useState, useRef } from "react";
import QuoteSegment from "../../general/components/quote-segment";
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

                <div className="col-span-10 border-r border-r-gray-200 h-full ">
                   

                
                        
                        
                        <div ref={schedulerParentRef}>
                            <TaskSchedulerContainer   
                                schedulerHeight={SCHEDULER_CONTAINER_STATIC_HEIGHT}
                                timeslotHeight={TIME_SLOT_STATIC_HEIGHT}
                                ref={schedulerParentRef}/>
                        </div>
                                   
                </div> 
            </div>
        </div>
       
        
    </>

}


export default PlanningPage;