
import MuiStyledButton from "../../../mui-wrappers/mui-button-wrapper";
import EventsPageHeader from "./events-page-header";
import EventsContentContainer from "./events-content-container";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MUI_StyledSegment from "../../../mui-wrappers/mui-segment-wrapper";
import LucidIconButton from "../../../lucid/lucid-button-icon";
import {getEventsFromAll, getPointsOfInterestFromAll, fetchAllApiData,removeAllApiDataFromDb, getNewsFromCountry, getWeatherInformationByDate, getPointsOfInterestCategoriesApi} from "../store/events-api";
import { MapPinned } from 'lucide-react';

import MainDataFilter from "./data-filters/main-data-filter";
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

    const [events, setEvents] = useState([]);
    const [pointsOfInterest, setPointsOfInterest] = useState([]);
    const [news, setNews] = useState([]);   
    const [weatherInformation, setWeatherInformation] = useState([]);   
    const [poiCategories, setPoiCategories] = useState([]); // stash them in store

    useEffect(() => {
        const fetchPoiCategories = async () => {
            const response = await getPointsOfInterestCategoriesApi();
            console.log(response);
            setPoiCategories(response.ResponseObject.categoricalEnums as any);        
        }

        fetchPoiCategories();
        // Initial data fetch or setup can be done here
    }, []); // Empty dependency array means this runs once on mount



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

        const onGetEvents = async () => {
            const result  = await getEventsFromAll();
            console.log(result);
            setEvents(result.ResponseObject as any);
        }    
        
        const onGetPointsOfInterest = async () => {
            const result  = await getPointsOfInterestFromAll();
            console.log(result);
            setPointsOfInterest(result.ResponseObject as any);
        } 

        const onGetNews = async (countryCode: string) => {
            const result  = await getNewsFromCountry(countryCode);
            console.log(result);
            setNews(result.ResponseObject as any);
        }

        const onGetWeather = async (date: string) => {
            const result  = await getWeatherInformationByDate(date);
            console.log(result);
            setWeatherInformation(result.ResponseObject as any);
        } 
  
    return (
    <>   
    <div className="bg-white h-screen flex flex-col">
    <div className="grid grid-cols-12 flex-1 min-h-0">
        <div className="col-span-2 border-r border-r-gray-200">
            {/* Search pane */}
            <div className="grid grid-cols-6">
                <div className="flex flex-rows col-span-6 p-2 justify-center items-center mt-6"> 

                       <MUI_StyledSegment spacing="segmentMedium" borderProfile="semiRounded" className="border border-b-green-200">  
                            <LucidIconButton
                            icon={MapPinned}
                            size={16}
                            opacity={.75}
                            palette="main"
                            borderProfile="semiStraight"
                            highlightBackgroundOnHover={true}
                            highlightBorderOnHover={true}
                            displayBorder={false}
                            tooltip="Change location"
                            onClick={() => console.log("Clicked Home")}
                            />   
                            <Typography variant="h5" >
                                Stockholm, Sweden
                            </Typography> 
                            
                            
                            </MUI_StyledSegment>   


                        
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
                    <MainDataFilter poiCategories={poiCategories}/>   
                </div>
            </div>

                         <div className="flex col-span-6 p-2 justify-end items-end">
                <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onGetEvents()}}> 
                    <Typography variant="subtitle2"> Get events </Typography>
                </MuiStyledButton>

                <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onGetPointsOfInterest()}}> 
                    <Typography variant="subtitle2"> Get Points Of Interest </Typography>
                </MuiStyledButton>

                <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onGetNews("SE")}}> 
                    <Typography variant="subtitle2"> Get News </Typography>
                </MuiStyledButton>               
                </div>
                <div className="flex col-span-6 p-2 justify-end items-end">
                <MuiStyledButton themeColor='light' buttonSize='xs' buttonVariant='main' borderType='rounded' opacity={.85} onClick={() => {onGetWeather("2025-10-20")}}> 
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

            <div className="flex-1 overflow-auto">                  
                <EventsContentContainer 
                    events={events}
                    pois={pointsOfInterest}
                    
            />  
            </div>
        </div> 
    </div>
</div>
               
    
    </>
    )
}


export default EventsPage;                                                                      