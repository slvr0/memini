import React from "react";
import { Typography } from "@mui/material";
import NewsFader
 from "./display-components/news-cards/news-content";
import WeatherWidget from "./display-components/weather-widget/weather-widget";

interface  EventsPageHeaderProps {
    news: Array<any>;
    weather: any;
    
}

const EventsPageHeader : React.FC<EventsPageHeaderProps> = (props) => {
    return (
    <>
    <div className="scheduler-content-header h-24">
        <div className="grid grid-cols-12 items-center h-full mx-2">
             <div className="flex col-span-6">
                <NewsFader 
                    newsNodes={props.news}
                    titleFontVariant="h6"
                    descriptionFontVariant="body1"
                    titleFontSize={13}
                    descriptionFontSize={11}
                    containerPadding={{ px: 4, py: 3 }}
                    transitionDuration={5000}
                    fadeDuration={1500}
                    borderOpacity={0.3}
                    paletteProfile="warning"              />
                
            </div>          

            <div className="flex col-span-4 items-center justify-center">
                <WeatherWidget nodes={props.weather}/>                    
         
            </div>

           
        </div>
    </div>
    </>) 
}

export default EventsPageHeader;