import React from "react";
import { Typography } from "@mui/material";

interface  EventsPageHeaderProps {

}

const EventsPageHeader : React.FC<EventsPageHeaderProps> = (props) => {
    return (
    <>
    <div className="scheduler-content-header h-20 border-b border-b-bg-gray-100">
        <div className="grid grid-cols-6 items-center h-full mx-2">
             <div className="flex col-span-2">
                
            </div>

             <div className="flex col-span-2">
                <Typography variant="h4" className="font-semibold opacity-80">
                    City, Country, State
                </Typography>
                
            </div>

            <div className="flex flex-col col-span-1">
                <Typography variant="overline" className="font-semibold opacity-80">
                    Members
                </Typography>

                <div className="flex">
                <Typography variant="overline" className="font-semibold opacity-80">
                    0
                </Typography>
                </div>
            </div>

            <div className="flex flex-col col-span-1">
                <Typography variant="overline" className="font-semibold opacity-80">
                    Friends
                </Typography>

                <div className="flex">
                <Typography variant="overline" className="font-semibold opacity-80">
                    0
                </Typography>
                </div>
            </div>
        </div>
    </div>
    </>) 
}

export default EventsPageHeader;