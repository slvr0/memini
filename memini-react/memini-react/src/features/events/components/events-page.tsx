
import MuiStyledButton from "../../../mui-wrappers/mui-button-wrapper";
import EventsPageHeader from "./events-page-header";
import EventsContentContainer from "./events-content-container";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MUI_StyledSegment from "../../../mui-wrappers/mui-segment-wrapper";
import LucidIconButton from "../../../lucid/lucid-button-icon";
import {
    getEventsFromAll, 
    getPointsOfInterestFromAll, 
    fetchAllApiData,
    removeAllApiDataFromDb, 
    getNewsFromCountry, 
    getWeatherInformationWeekForecastApi, 
    getPointsOfInterestCategoriesApi
} from "../store/events-api";

import { Earth, Globe, MapPinned } from 'lucide-react';

import MainDataFilter from "./data-filters/main-data-filter";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IEventSearchFilter, IPointOfInterestFilter } from "@/interfaces/common-interfaces";

import moment from 'moment';

interface GreenDotProps {
  size?: number; // size in pixels
  className?: string;
}

const GreenDot = ({ size = 8, className = "" }: GreenDotProps) => {
  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#4DC19D',
        borderRadius: '50%',
      }}
    />
  );
};

function EventsPage() { 
    const userLocation = useSelector((state: RootState) => state.location); 

    const [news, setNews] = useState([]);   
    const [weatherInformation, setWeatherInformation] = useState([]);  

        
        
    const onFetchEventApiData = async () => {        
        try {
            const result = await fetchAllApiData();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const onCleanupOldApiData = async () => { 
        try {
            const result = await removeAllApiDataFromDb();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const onGetNews = async (countryCode: string) => {
        const result  = await getNewsFromCountry(countryCode);
        console.log(result);
        setNews(result.ResponseObject as any);
    }

    const onGetWeather = async () => {
        const result  = await getWeatherInformationWeekForecastApi();
        console.log(result);
        setWeatherInformation(result.ResponseObject as any);
    } 

    useEffect(() => {
        const initiateWeatherAndNews = async () => {
            if (!userLocation) {
                return;
            }  

            await onGetNews(userLocation.Country);
            await onGetWeather();
        }
        initiateWeatherAndNews();
    }, [userLocation]);  
  
    return (
    <>   
    <div className="bg-white h-screen flex flex-col">
    <div className="grid grid-cols-12 flex-1 min-h-0">
        <div className="col-span-2 border-r border-r-gray-200">
            {/* Search pane */}
            <div className="grid grid-cols-6">
                <div className="flex flex-row gap-4 col-span-6 justify-center items-center mt-4"> 
    <LucidIconButton
        icon={Earth}
        className="p-2 !text-[#2e7b63]"
        size={20}
        opacity={.75}
        palette="main"
        borderProfile="semiStraight"
        highlightBackgroundOnHover={true}
        highlightBorderOnHover={true}
        displayBorder={true}
        tooltip="Change location"
        onClick={() => console.log("Clicked Home")}
    />   
    <Typography variant="h6" fontSize={18} >
        {userLocation.City}, {userLocation.Country}
    </Typography>  
        </div>

            <div className="flex col-span-6 gap-16 p-2 justify-center items-center">
                <div className="flex flex-col col-span-1 items-center">
                <div className="flex items-center gap-1">
                <GreenDot size={6}/>
                <Typography variant="overline" className="font-semibold opacity-80">
                Members
                </Typography>
                </div>

                <Typography variant="overline" className="font-semibold opacity-80">
                14
                </Typography>
                </div>

                <div className="flex flex-col col-span-1 items-center">
                <div className="flex items-center gap-1">
                <GreenDot size={6}/>
                <Typography variant="overline" className="font-semibold opacity-80">
                Friends
                </Typography>
                </div>

                <Typography variant="overline" className="font-semibold opacity-80">
                2
                </Typography>
                </div>
            </div>

            <div className="col-span-6">
                <MainDataFilter />   
            </div>
        </div>

        <div className="flex col-span-6 p-2 justify-end items-end">
            {/* <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onGetEvents()}}> 
                <Typography variant="subtitle2"> Get events </Typography>
            </MuiStyledButton> */}


            <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onGetNews("SE")}}> 
                <Typography variant="subtitle2"> Get News </Typography>
            </MuiStyledButton>               
            </div>
            <div className="flex col-span-6 p-2 justify-end items-end">
            <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onGetWeather()}}> 
            <Typography variant="subtitle2"> Get Weather </Typography>
            </MuiStyledButton>

            <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onFetchEventApiData()}}> 
                <Typography variant="subtitle2"> FETCH ALL  </Typography>
            </MuiStyledButton>
            
            <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onCleanupOldApiData()}}> 
                <Typography variant="subtitle2"> REMOVE ALL  </Typography>
            </MuiStyledButton>
            </div>
				           
        </div>

        <div className="col-span-10 flex flex-col min-h-0">   
            <div className="flex-shrink-0">                  
                <EventsPageHeader news={news} weather={weatherInformation}/>  
            </div>

            <div className="flex-1">                  
                <EventsContentContainer                
                                     
            />  
            </div>
        </div> 
    </div>
</div>
               
    
    </>
    )
}


export default EventsPage;                                                                      