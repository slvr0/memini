import FormGroup from '@mui/material/FormGroup';    
import { Switch, FormControlLabel, Typography, Paper } from "@mui/material";
import MuiStyledTextField from "../../../../mui-wrappers/mui-textfield-wrapper";
import MuiStyledDatePicker from "../../../../mui-wrappers/mui-datepicker-wrapper";
import dayjs, { Dayjs } from 'dayjs';
import { MapPinned, Hourglass, RefreshCcwDot } from 'lucide-react';
import { useEffect, useState } from "react";   
import MuiStyledButton from '../../../../mui-wrappers/mui-button-wrapper';
import LucidIconButton from "../../../../lucid/lucid-button-icon";
import TimespanFilter from './timespan-filter';
import CategoryMultiSelect from './multiselect-filter';
import CategoryMultiSelectEnum from './multiselect-filter-enum';
import { CircleX } from 'lucide-react';
import CategorySingleSelect
 from './singleselect-filter';
import MuiStyledSwitch from '../../../../mui-wrappers/mui-switch-wrapper';
import MuiStyledSlider from '../../../../mui-wrappers/mui-slider-wrapper';
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { useEventSearch } from '../../hooks/event-search-hook';
import { IEventSearchFilter, EventSearchFilterInput,PointOfInterestSearchFilterInput } from '@/interfaces/common-interfaces';
import { usePointOfInterestSearch } from '../../hooks/poi-search-hook';

const categories = ["Any", "Music", "Sports", "Arts & Theatre", "Family", "Film", "Miscellaneous"];
const timewindowOptions = ["Today", "This week", "This month", "This year"];
const timewindowOptionsValue: Record<string, number> = {
  "Today": 1,
  "This week": 7,
  "This month": 30,
  "This year": 365
};

interface MainDataFilterProps {
    renderOnLoad? : boolean;
}

const MainDataFilter: React.FC<MainDataFilterProps> = (props) => {
    const userLocation = useSelector((state: RootState) => state.location);

    const [{ loading: eventIsLoading }, { search: searchEvent }] = useEventSearch();
    const [{ loading: poiIsLoading, error, poiCategories }, { search: searchPoi}] = usePointOfInterestSearch();      

    /// State variables for event filters
    const [eventFreeSearch, setEventFreeSearch] = useState<string>('');
    const [eventCreatorSearch, setEventCreatorSearch] = useState<string>('');
    const [eventCategories, setEventCategories] = useState<string[]>(["Any"]);
    const [eventTimespan, setEventTimespan] = useState<string>('This month');
    const [eventSwitchAvailableTickets, setEventSwitchAvailableTickets] = useState<boolean>(true);
    const [eventSwitchShowTicketmaster, setEventSwitchShowTicketmaster] = useState<boolean>(true);
    const [eventSwitchShowPredictHq, setEventSwitchShowPredictHq] = useState<boolean>(true);   

    /// State variables for places filters
    const [placesFreeSearch, setPlacesFreeSearch] = useState<string>('');
    const [placesCategories, setPlacesCategories] = useState<string[]>(["Any"]); //multiselect enum so we simply keep track of the number 
    const [placesCategoriesEnumValue, setPlacesCategoriesEnumValue] = useState<number>(0); //multiselect enum so we simply keep track of the number 
    const [minRating, setMinRating] = useState<number>(0);
    const [totalRatings, setTotalRatings] = useState<number>(0);    

    const onUpdateEventsSearchFilter = () => {
        const filter : EventSearchFilterInput = {
            ...userLocation,
            eventFreeSearch,
            eventCreatorSearch,
            eventCategories,
            eventTimespan: timewindowOptionsValue[eventTimespan],
            eventSwitchAvailableTickets,
            eventSwitchShowTicketmaster,
            eventSwitchShowPredictHq
        };  
        searchEvent(filter);
    }

    const onUpdatePointOfInterestSearchFilter = () => {
          const filter: PointOfInterestSearchFilterInput = {
            ...userLocation,
            placesFreeSearch,
            placesCategories,
            placesCategoriesEnumValue,
            minRating,
            totalRatings
        };        
        searchPoi(filter);
    }

    useEffect(() => {
        if (!userLocation) {
            return;
        }        
        onUpdateEventsSearchFilter();
        onUpdatePointOfInterestSearchFilter();
    }, [userLocation, props.renderOnLoad]);

    return (<>        
    <div className="col-span-6">
        <FormGroup>  
            <div className="flex flex-row w-full px-4 items-center justify-between mx-auto mt-2">
                    <Typography variant="subtitle1">
                        Events
                    </Typography>
                        <LucidIconButton
                            icon={RefreshCcwDot}
                            size={18}
                            opacity={.95}
                            palette="main"
                            borderProfile="semiRounded"
                            highlightBackgroundOnHover={true}
                            highlightBorderOnHover={true}
                            displayBorder={true}
                            className={`p-2 !text-blue-600 transition-transform ${eventIsLoading ? 'animate-spin' : ''}`}
                            tooltip="Refresh filter"
                            onClick={() => {onUpdateEventsSearchFilter()}}
                        />       
            </div>
            <div className="flex flex-col gap-2 w-full mt-4 px-2">
                  <MuiStyledTextField                  
                    size='small'
                    id="outlined"
                    label="Search events"
                    placeholder="Search for an event name..."
                    value={eventFreeSearch}
                    onChange={(e) => setEventFreeSearch(e.currentTarget.value)}
                    variant="outlined"
                    themeProps={{                        
                        paletteProfile: 'main',
                        borderProfile: 'semiStraight',
                        spacingProfile: 'medium',
                        mode: 'light',
                        fontSize: '10px',
                        labelFontSize: '11px', 
                        labelOpacity:1.0,                     
                        helperTextFontSize:'10px',
                        helperTextOpacity:0.6                                 
                    }}
                />
            </div>   

  
            <div className="flex flex-col gap-2 w-full mt-4 px-2">
                  <MuiStyledTextField
                
                    size='small'
                    id="outlined"
                    label="Artist/Performer/Creator"
                    placeholder="Search for an artist, performer or whom created the event..."
                    value={eventCreatorSearch}
                    onChange={(e) => setEventCreatorSearch(e.currentTarget.value)}
                    variant="outlined"
                    themeProps={{                        
                        paletteProfile: 'main',
                        borderProfile: 'semiStraight',
                        spacingProfile: 'medium',
                        mode: 'light',
                        fontSize: '10px',
                        labelFontSize: '11px',    
                        labelOpacity:1.0,                    
                        helperTextFontSize:'10px',
                        helperTextOpacity:0.6                                 
                    }}
                />
            </div>     


            <div className="flex flex-row gap-2 w-full mt-4 items-center px-2">
                <CategoryMultiSelect 
                    className="opacity-90"
                    categories={categories}
                    label=""
                    paletteProfile="main"
                    containerBorderProfile="semiStraight"
                    categoryBorderProfile="rounded"
                    containerPadding={{ px: 2, py: 3 }}
                    categoryFontSize={10}
                    categoryFontVariant="subtitle2"
                    value={eventCategories}
                    onChange={(newValues) => setEventCategories(newValues)}
                    
                />
            </div>            
                

            <div className="grid grid-cols-6 gap-2 w-full mt-4 px-2 items-center">
                <div className="flex col-span-3">
                    <CategorySingleSelect 
                        className="opacity-90"
                        options={timewindowOptions}
                        label="Time window"
                        paletteProfile="main"
                        containerBorderProfile="semiStraight"
                        optionBorderProfile="rounded"
                        containerPadding={{ px: 2, py: 3 }}
                        optionFontSize={10}
                        optionFontVariant="subtitle2"
                        value={eventTimespan}
                        onChange={(newValue) => setEventTimespan(newValue)}
                    />                             
                </div>

                <div className="flex flex-col col-span-3 gap-2">
                    <MuiStyledSwitch 
                        label="Available tickets"
                        paletteProfile="harmonicRed"
                        labelFontSize={10}
                        labelFontVariant="subtitle2"
                        value={eventSwitchAvailableTickets}
                        onChange={(newValue) => setEventSwitchAvailableTickets(newValue)}
                    />

                    <MuiStyledSwitch 
                        label="Ticketmaster events"
                        paletteProfile="harmonicRed"
                        labelFontSize={10}
                        labelFontVariant="subtitle2"
                        value={eventSwitchShowTicketmaster}
                        onChange={(newValue) => setEventSwitchShowTicketmaster(newValue)}   
                    />

                    <MuiStyledSwitch 
                        label="Predict HQ events"
                        paletteProfile="harmonicRed"
                        labelFontSize={10}
                        labelFontVariant="subtitle2"
                        value={eventSwitchShowPredictHq}       
                        onChange={(newValue) => setEventSwitchShowPredictHq(newValue)}  
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2 px-4 border-b w-3/4 mt-4 shadow-md mx-4">
            </div>

            <div className="flex flex-row w-full px-4 items-center justify-between mx-auto mt-2">
                    <Typography variant="subtitle1">
                        Places
                    </Typography>
                        <LucidIconButton
                            icon={RefreshCcwDot}
                            size={18}
                            opacity={.95}
                            palette="main"
                            borderProfile="semiRounded"
                            highlightBackgroundOnHover={true}
                            highlightBorderOnHover={true}
                            displayBorder={true}
                            className={`p-2 !text-blue-600 transition-transform ${poiIsLoading ? 'animate-spin' : ''}`}
                            tooltip="Refresh filter"
                            onClick={() => {onUpdatePointOfInterestSearchFilter()}}
                        />       
            </div>



            <div className="flex flex-col gap-2 w-full mt-4 px-2">
                  <MuiStyledTextField                  
                    size='small'
                    id="outlined"
                    label="Search places"
                    placeholder="Restaurant, bar, landmark..."
                    value={placesFreeSearch}
                    onChange={(e) => setPlacesFreeSearch(e.currentTarget.value)}
                    variant="outlined"
                    themeProps={{                        
                        paletteProfile: 'main',
                        borderProfile: 'semiStraight',
                        spacingProfile: 'medium',
                        mode: 'light',
                        fontSize: '10px',
                        labelFontSize: '11px', 
                        labelOpacity:1.0,                     
                        helperTextFontSize:'10px',
                        helperTextOpacity:0.6                                 
                    }}
                />
            </div> 

            <div className="flex flex-row gap-2 w-full mt-4 items-center px-2">
                <CategoryMultiSelectEnum 
                    className="opacity-90"
                    categories={poiCategories || []}
                    label=""
                    paletteProfile="main"
                    containerBorderProfile="semiStraight"
                    categoryBorderProfile="rounded"
                    containerPadding={{ px: 2, py: 3 }}
                    categoryFontSize={10}
                    categoryFontVariant="subtitle2"   
                    selectedDescriptions={placesCategories}
                    selectedEnumValue={placesCategoriesEnumValue}
                    onChange={(newDescriptions, newEnumValue) => {
                        setPlacesCategories(newDescriptions);
                        setPlacesCategoriesEnumValue(newEnumValue);
                    }}                 
                />
            </div> 

            <div className="grid grid-cols-2 gap-4 w-full mt-4 px-4">
                <div className="flex col-span-1 ">               
                    <MuiStyledSlider
                    label="Min Rating"
                    min={0}
                    max={5}
                    discreteStep={.25}
                    labelFontSize={10}
                    labelFontVariant="subtitle2"
                    valueFontSize={10}
                    paletteProfile="meminiThemeOutline"
                    markerInterval={1}
                    value={minRating}
                    onChange={(newValue) => setMinRating(newValue)}
                    /> 
                </div>

                <div className="flex col-span-1">
                <MuiStyledSlider
                    label="Amount of ratings"
                    min={0}
                    max={1000}
                    discreteStep={50}
                    labelFontSize={10}
                    labelFontVariant="subtitle2"
                    valueFontSize={10}
                    paletteProfile="meminiThemeOutline"
                    markerInterval={500}
                    value={totalRatings}
                    onChange={(newValue) => setTotalRatings(newValue)}
                    /> 
                </div>
            </div>

         
        </FormGroup>
    </div>
    </>    
) 
}

export default MainDataFilter;  