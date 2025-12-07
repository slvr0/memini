import React, { useRef } from "react";
import EventCardDisplayList from "./display-components/event-cards/event-card-list";
import PoiCardDisplayList from "./display-components/poi-cards/poi-list-display";

import MuiStyledPagination from '../../../mui-wrappers/mui-pagination-wrapper'
import { useEventSearch } from '../hooks/event-search-hook';
import { usePointOfInterestSearch } from "../hooks/poi-search-hook";
import { Typography } from "@mui/material";
import SourceLogoDisplay, {SourceAttribution} from "./source-logos";
import ContentRenderer from "./content-renderer";
import ActivityDisplayContainer from "../../activity/components/activity-display-container";

import { ActivityDisplayRef } from "../../activity/components/activity-display-container";

interface EventsContentContainerProps {   
   
}

const EventsContentContainer : React.FC<EventsContentContainerProps> = (props) => {
    const activityDisplayRef = useRef<ActivityDisplayRef>(null);

    const onSelectActivity  = async (node: any) => {   
        await activityDisplayRef.current?.setActivityData(node);
        activityDisplayRef.current?.openModal();
    }

    return (
        <>
        <ActivityDisplayContainer ref={activityDisplayRef}/>


        <div className="grid grid-cols-12 px-2 h-full">
            {/* Events Section */}
            <div className="col-span-8 flex flex-col">        
            <ContentRenderer type="events" onSelectActivity={(node: any) => onSelectActivity(node)}/>       
            </div>
            
            {/* POIs Section */}
            <div className="col-span-4 flex flex-col ">
            <ContentRenderer type="pointsOfInterest" onSelectActivity={(node: any) => onSelectActivity(node)}/>  
            </div>
        </div>        
        </>
    )
}

export default EventsContentContainer;