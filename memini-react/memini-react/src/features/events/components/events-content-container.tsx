import React from "react";
import EventCardDisplayList from "./display-components/event-cards/event-card-list";
import PoiCardDisplayList from "./display-components/poi-cards/poi-list-display";
import MuiStyledButton from '@/mui-wrappers/mui-button-wrapper';

interface EventsContentContainerProps {
    events: Array<any>
    pois: Array<any>
}

const EventsContentContainer : React.FC<EventsContentContainerProps> = (props) => {
    const events = props.events;
    const pois = props.pois;
    return (
        <>
    <div className="grid grid-cols-12 gap-4">
    <div className="col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
            {events.map((event, index) => {
                return (
                    <EventCardDisplayList
                        key={index}
                        source={event.Source}
                        category={event.ContentInfo.Category}
                        genre={event.ContentInfo.Genre}
                        imageUrl={event.ContentInfo.ContentMedia[0]?.Url}
                        label={event.Label}
                        date={event.StartDate}
                        country={event.Country}
                        city={event.City}
                        address={event.SpatialInfo.Address}
                        venueName={event.SpatialInfo.VenueName}
                        availability={event.CommercialStatusInfo.Availability}
                        price={event.CommercialStatusInfo.MinPrice}
                        website={event.CommercialStatusInfo.WebsiteUrl}
                    />
                )
            })}
        </div> 
    </div>

    <div className="col-span-4">
        <div className="grid grid-cols-2 gap-3 p-3">
            {pois.map((poi, index) => {               
                return (
                    <PoiCardDisplayList                    
                        key={index}                        
                        label={poi.Label}
                        description={poi.Description}                                  
                        source={poi.Source}
                        categories={poi.PoiInfo.AllCategories}
                        city={poi.PoiInfo.City}
                        address={poi.PoiInfo.Address}
                        postalCode={poi.PoiInfo.Postalcode}
                        rating={poi.PoiInfo.Rating}
                        totalRatings={poi.PoiInfo.totalRatings}
                        verified={poi.PoiInfo.Verified}
                        isOpen={poi.PoiInfo.Open}
                        website={poi.PoiInfo.WebsiteUrl}
                    />
                )
            })}
        </div>
    </div>
</div>


          


        </>
    )
}

export default EventsContentContainer;