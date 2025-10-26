import React from "react";
import EventCardDisplayList from "./display-components/event-cards/event-card-list";
import PoiCardDisplayList from "./display-components/poi-cards/poi-list-display";

import MuiStyledPagination from '../../../mui-wrappers/mui-pagination-wrapper'
import { useEventSearch } from '../hooks/event-search-hook';
import { usePointOfInterestSearch } from "../hooks/poi-search-hook";
import { Typography } from "@mui/material";
import SourceLogoDisplay, {SourceAttribution} from "./source-logos";
import ContentRenderer from "./content-renderer";

interface EventsContentContainerProps {   
   
}

const EventsContentContainer : React.FC<EventsContentContainerProps> = (props) => {
    return (
        <>
        <div className="grid grid-cols-12 px-2 h-full">
            {/* Events Section */}
            <div className="col-span-8 flex flex-col bg-miThemeLight">        
            <ContentRenderer type="events"/>       
            </div>
            
            {/* POIs Section */}
            <div className="col-span-4 flex flex-col bg-miThemeLight">
            <ContentRenderer type="pointsOfInterest"/>  
            </div>
        </div>        
        </>
    )
}

export default EventsContentContainer;