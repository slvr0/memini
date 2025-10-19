
import MuiStyledButton from "../../../mui-wrappers/mui-button-wrapper";
import EventsPageHeader from "./events-page-header";
import EventsContentContainer from "./events-content-container";
import { Typography } from "@mui/material";
import { useState } from "react";

import {getEventsFromAll} from "../store/events-api";

function EventsPage() { 

    const [events, setEvents] = useState([]);
    
        // const onFetchEventApiData = async () => {        
        //     try {
        //         const result = await fetchEventApiData();
        //         console.log(result);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // const onCleanupOldApiData = async () => { 
        //     try {
        //         const result = await cleanupOldApiData();
        //         console.log(result);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        const onGetEvents = async () => {
            const result  = await getEventsFromAll();
            console.log(result);
            setEvents(result.ResponseObject as any);
        }            
  
    return (
    <>   
       <div className="bg-white h-screen flex flex-col">
    <div className="grid grid-cols-12 flex-1 min-h-0">
        <div className="col-span-2 border-r border-r-gray-200">
            {/* Search pane */}

            <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onGetEvents()}}> 
                <Typography variant="subtitle2"> Get events </Typography>
            </MuiStyledButton>
        </div>

        <div className="col-span-10 border-r border-r-gray-200 flex flex-col min-h-0">   
            <div className="border-b border-b-gray-200 flex-shrink-0">                  
                <EventsPageHeader/>  
            </div>

            <div className="flex-1 overflow-auto">                  
                <EventsContentContainer events={events}/>  
            </div>
        </div> 
    </div>
</div>
               
    
    </>
    )
}


export default EventsPage;                                                                      