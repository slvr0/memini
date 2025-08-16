import QuoteSegment from "../../general-components/components/quote-segment.jsx";
import PlanningMainDashboard from './planning-main-dashboard.jsx'

//TODO: Make the schedule manager and calendar into a portal component so we can propdrill into it.
//Right now im forced to use redux to control connections to schedule selection


function PlanningPage() { 
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