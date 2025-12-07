import React, { Fragment, useEffect, createRef,useState, useRef } from "react";

import PlanningScheduleContainer from "./planning-schedule/planning-schedule-container";
import PlanningManagementContainer from "./planning-management/planning-management-container"


import { Typography, Box } from "@mui/material";
import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText } from "lucide-react";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function PlanningPage() {    
     
    const schedulerParentRef = useRef(null); //clear name convention, this is to calculate if scroll is needed, not to be used for imperative handling.

    const SCHEDULER_CONTAINER_STATIC_HEIGHT = window.innerHeight * .85;
    const TIME_SLOT_STATIC_HEIGHT = SCHEDULER_CONTAINER_STATIC_HEIGHT * 0.0416666666666667; 

    return <> 
         {/* <MuiModal
            ref={modifyTaskRef}         
            onClose={() => {}}
            onAction={() => {}}
            modalTitle="Edit Task"
            actionLabel="Save"
            cancelLabel="Cancel"        
            >
            <EditTaskForm modalWrapper={modifyTaskRef as React.RefObject<MuiModalRef>}></EditTaskForm>
        </MuiModal>  */}

        <div className="h-screen bg-white">
            <div className="grid grid-cols-12 h-full">
                <div className="col-span-2 border-r border-r-gray-200 h-full">
                     <DndProvider backend={HTML5Backend}>
                        <PlanningManagementContainer/>
                    </DndProvider>
                </div>

                <div className="col-span-10 border-r border-r-gray-200 h-full ">                        
                        <div ref={schedulerParentRef}>
                            <PlanningScheduleContainer   
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