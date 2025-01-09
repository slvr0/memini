import CalendarContainer from "./calendar/components/calendar-container";
import ScheduleGridContextProvider from "./schedule-grid/store/schedule-grid-context-provider";
import ScheduleGridManager from "./schedule-grid/components/schedule-grid-manager";

function PlanningPage() {
    
    return <>
    
        <div className="four wide column content-container">
                    <CalendarContainer /> 
            </div>

            <div className="four wide column content-container">
                
            </div>

            <div className="eight wide column content-container">
            <ScheduleGridContextProvider> 
                <ScheduleGridManager />
            </ScheduleGridContextProvider>
        </div>
    </>

}


export default PlanningPage;