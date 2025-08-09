import CalendarContainer from "./calendar/components/calendar-container";
import ScheduleGridContextProvider from "./schedule-grid/store/schedule-grid-context-provider";
import ScheduleGridManager from "./schedule-grid/components/schedule-grid-manager";
import GeneralForm from "./general-components/components/general-form.jsx";
import MeminiIconButton from ".//general-components/components/memini-icon-button.jsx"
import MenuBarInverted from ".//general-components/components/menu-bar-inverted.jsx"
import CalendarSelectedDate from ".//calendar/components/calendar-selected-date.jsx"
import {useSelector, useDispatch} from 'react-redux';

import { userTasksActions } from "../redux-memini-store.js";

import { Menu, Icon } from 'semantic-ui-react';
function PlanningPage() {

    const dispatch          = useDispatch();
   

    const rows = [
        {id:'title', type: 'input', label:'Title', placeholder:'Enter title of activity...'},
        {id:'description', type: 'input', label:'Description', placeholder:'What are you planning to do?'},
        {id:'startTime', type: 'discrete-time-slider', label:'Start time', placeholder:'Start time'},
        {id:'endTime', type: 'discrete-time-slider', label:'End time', placeholder:'End time'},
        
    ]    

    const onSubmitForm = (formData) => {
        //yeah what to do.      
        const title = formData.title;
        const description = formData.description;
        const startTime = parseInt(formData.startTime);
        const endTime = parseInt(formData.endTime);
        const type = "fun";
        
        dispatch(userTasksActions.addTask({ title: title, description: description, startTime: startTime, endTime:endTime, type:type, attached: true }));

    } 
    
    return <>  
        <div className="grid grid-cols-4 mt-2">  
            <div className="col-span-2 planning-content">
                   <MenuBarInverted>   </MenuBarInverted>

                   <GeneralForm 
                    onSubmit={onSubmitForm} 
                    rows={rows}
                    headerText={'Create/Update Activity'}
                    headerSubText={'Create a new activity or edit an existing one with below form.'}
                    submitButtonName="Add/Update"
                />


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