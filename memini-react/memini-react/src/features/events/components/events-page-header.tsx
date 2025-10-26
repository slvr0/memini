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
            <div className="flex col-span-6 items-center justify-center">
                <WeatherWidget nodes={props.weather}/>      
            </div>
            
            <div className="flex col-span-6">
                <NewsFader 
                    newsNodes={props.news}
                    titleFontVariant="body1"
                    descriptionFontVariant="body2"
                    titleFontSize={12}
                    descriptionFontSize={10}
                    containerPadding={{ px: 2, py: 2 }}
                    transitionDuration={10000}
                    fadeDuration={1500}
                    borderOpacity={0}
                    paletteProfile="main"  
                />
                
            </div> 


           
        </div>
    </div>
    </>) 
}

export default EventsPageHeader;