import FormGroup from '@mui/material/FormGroup';    
import { Switch, FormControlLabel, Typography, Paper } from "@mui/material";
import MuiStyledTextField from "../../../../mui-wrappers/mui-textfield-wrapper";
import MuiStyledDatePicker from "../../../../mui-wrappers/mui-datepicker-wrapper";
import dayjs, { Dayjs } from 'dayjs';
import { MapPinned, Hourglass } from 'lucide-react';
import { useState } from "react";   
import MuiStyledButton from '../../../../mui-wrappers/mui-button-wrapper';
import LucidIconButton from "../../../../lucid/lucid-button-icon";
import TimespanFilter from './timespan-filter';
import CategoryMultiSelect from './multiselect-filter';
import CategorySingleSelect
 from './singleselect-filter';
import MuiStyledSwitch from '../../../../mui-wrappers/mui-switch-wrapper';
import MuiStyledSlider from '../../../../mui-wrappers/mui-slider-wrapper';

const categories = ["Technology", "Health", "Finance", "Education", "Sports", "Entertainment"];
const options = ["Daily", "Weekly", "Monthly", "Yearly"];

interface MainDataFilterProps {
    poiCategories?: Array<any>; //change to int , string desc later. internal structure.
}

const MainDataFilter: React.FC<MainDataFilterProps> = (props) => {
    const [freeSearchFilter, setFreeSearchFilter] = useState<string>('');

    var todayJs = dayjs();
    const [startDateFilter, setStartDateFilter] = useState<Dayjs>(
        todayJs
    );
    const [endDateFilter, setEndDateFilter] = useState<Dayjs>(
        todayJs.add(7, 'day')
    );

    const [timespanSelection, setTimespanSelection] = useState<number>(7);    

    console.log(timespanSelection);
    return (<>
   <div className="col-span-6">
        <FormGroup>           
            <div className="flex flex-row gap-2 px-4 border-b border-b-gray-200 w-3/4 items-center justify-center mx-auto">
                <Typography variant="caption">
                    Events
                </Typography>
            </div>

            <div className="flex flex-col gap-2 w-full px-4">
               
            </div>

            <div className="flex flex-col gap-2 w-full mt-4 px-2">
                  <MuiStyledTextField                  
                    size='small'
                    id="outlined"
                    label="Event name"
                    placeholder="Search for an event name..."
                    value={freeSearchFilter}
                    onChange={(e) => setFreeSearchFilter(e.currentTarget.value)}
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
                    label="Artist"
                    placeholder="Search for an artist or performer..."
                    value={freeSearchFilter}
                    onChange={(e) => setFreeSearchFilter(e.currentTarget.value)}
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
                    
                />
            </div>            
                

            <div className="grid grid-cols-6 gap-2 w-full mt-4 px-2 items-center">
                <div className="flex col-span-3">
                    <CategorySingleSelect 
                        className="opacity-90"
                        options={options}
                        label="Time window"
                        paletteProfile="main"
                        containerBorderProfile="semiStraight"
                        optionBorderProfile="rounded"
                        containerPadding={{ px: 2, py: 3 }}
                        optionFontSize={10}
                        optionFontVariant="subtitle2"
                    />                             
                </div>

                <div className="flex flex-col col-span-3 gap-2">
                    <MuiStyledSwitch 
                        label="Available tickets"
                        paletteProfile="harmonicRed"
                        labelFontSize={11}
                        labelFontVariant="subtitle2"
                    />

                    <MuiStyledSwitch 
                        label="Ticketmaster events"
                        paletteProfile="harmonicRed"
                        labelFontSize={11}
                        labelFontVariant="subtitle2"
                    />

                    <MuiStyledSwitch 
                        label="Predict HQ events"
                        paletteProfile="harmonicRed"
                        labelFontSize={11}
                        labelFontVariant="subtitle2"
                    />
                </div>
            </div>

        
            
            <div className="grid grid-cols-2 gap-2 w-full mt-4 px-2">
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
                    /> 
                </div>

                 <div className="flex col-span-1">
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
                    /> 
                </div>
            </div>

            <div className="flex flex-row gap-2 px-4 border-b border-b-gray-200 w-3/4 items-center justify-center mx-auto">
                <Typography variant="caption">
                    Places
                </Typography>
            </div>

            <div className="flex flex-col gap-2 w-full mt-4 px-2">
                  <MuiStyledTextField                  
                    size='small'
                    id="outlined"
                    label="Place"
                    placeholder="Restaurant, bar, landmark..."
                    value={freeSearchFilter}
                    onChange={(e) => setFreeSearchFilter(e.currentTarget.value)}
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
                    categories={props.poiCategories?.map(cat => cat.Description) || [] }
                    label=""
                    paletteProfile="main"
                    containerBorderProfile="semiStraight"
                    categoryBorderProfile="rounded"
                    containerPadding={{ px: 2, py: 3 }}
                    categoryFontSize={10}
                    categoryFontVariant="subtitle2"
                    
                />
            </div> 
         
        </FormGroup>
    </div>
    </>    
) 
}

export default MainDataFilter;  