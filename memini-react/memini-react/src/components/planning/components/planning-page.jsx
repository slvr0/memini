import QuoteSegment from "../../general-components/components/quote-segment.jsx";
import { useDispatch} from 'react-redux';
import { userTasksActions } from "../../../redux-memini-store.js";
import PlanningMainDashboard from './planning-main-dashboard.jsx'

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
        <div className="grid grid-cols-12 mt-2">  

            <div className="col-span-2">
                <QuoteSegment></QuoteSegment>
            </div>
            <div className="col-span-1">

            </div>
            <div className="col-span-8">

                <PlanningMainDashboard
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