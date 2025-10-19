import React from "react";

import EventCardDisplayList from "./display-components/event-cards/event-card-list";

interface EventsContentContainerProps {
    events: Array<any>
}

const EventsContentContainer : React.FC<EventsContentContainerProps> = (props) => {
    const events = props.events;
    return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 p-1">
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
                        />
                    )
                })}
            </div>


        </>
    )
}

export default EventsContentContainer;