import React, { Fragment, useEffect, createRef,useState } from "react";
import QuoteSegment from "../../general/components/quote-segment";
import PlanningMainDashboard from './planning-main-dashboard'
import TrackingTasksTab from "./tracking-tasks-tab";
import MuiModal from "../../general/components/mui-modal";
import { MuiModalRef } from "../../general/interfaces/general-types";
import EditTaskForm from "./edit-task-form";


//TODO: Make the schedule manager and calendar into a portal component so we can propdrill into it.
//Right now im forced to use redux to control connections to schedule selection

function PlanningPage() {    
    const modifyTaskRef = createRef<MuiModalRef>(); 

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
       
        <div className="grid grid-cols-12 mt-2">  
            
            
            <div className="col-span-3">               

                <TrackingTasksTab></TrackingTasksTab>
            </div>
            <div className="col-span-1">

            </div>
            <div className="col-span-7">

                <PlanningMainDashboard
                    modifyTaskRef={modifyTaskRef}
                    headerText="Schedule planning dashboard" 
                    subHeaderText="Manage your tasks with quick access to tools and settings.">
                </PlanningMainDashboard>
                                   
            </div>
             <div className="col-span-1">

            </div> 

            <div className="col-span-2 planning-content mt-2">
                    
            </div>
            <div className="col-span-1 planning-content">            

            <div className="grid grid-cols-4">
            <div className="col-span-4 planning-content mt-2">
                {/*Here is the activity select form*/} 
                
            </div>

            <div className="col-span-1 planning-content mt-2">
                {/*Remove the context dude*/}
            </div>
            </div>  
            </div>

            <div className="col-span-1 planning-content">    
            </div>        

           
            <div className="col-span-1">
            </div>
        </div>
    </>

}


export default PlanningPage;