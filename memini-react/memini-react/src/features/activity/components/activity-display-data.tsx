import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';

import MUI_StyledSegment from '../../../mui-wrappers/mui-segment-wrapper';
import LucidIconButton from '../../../lucid/lucid-button-icon';
import { Codepen, MapPin, Timer, ClockFading, Guitar, ChartBarStacked, Store, Trash } from 'lucide-react';

import { Modal,Card, CardContent, CardMedia, Chip, Typography, Box, Link, Tooltip } from '@mui/material';
import {getEventsFromAll, getNodeByKeyApi} from '../../events/store/events-api';

import MuiStyledTextField from "../../../mui-wrappers/mui-textfield-wrapper";
import MuiStyledDatePicker from "../../../mui-wrappers/mui-datepicker-wrapper";
import { LucideProps } from "lucide-react";

import FormattedIconField, { FormattedIconFieldRef } from './formatted-field-display';  
import { PackagePlus, FileBox, BookHeart} from "lucide-react";
import CoreNodeDisplay, {CoreNodeRef} from './core-node-display';

import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText, CircleUserRound, LogOut, AtSign, Heart, UserRoundSearch, Check } from "lucide-react";

import MuiStyledSwitch from "../../../mui-wrappers/mui-switch-wrapper";
import { PropaneSharp } from '@mui/icons-material';
import MuiStyledButton from '../../../mui-wrappers/mui-button-wrapper';

interface ActivityDisplayDataProps {
    activityNode?: any;  
    onSave: (data: any) => void;      
}

//have to set core node stuff also
const ActivityDisplayData : React.FC<ActivityDisplayDataProps> = ({activityNode, onSave}) => { 
    
    const formFieldContainerHeight = "h-48";
    const activity = structuredClone(activityNode);
    const [activityTitle, setActivityTitle] = useState<string>(activity?.Label ?? "");

    const imageUrl = activity?.ContentInfo?.ContentMedia[0].Url ?? "";
    const spatialRef = useRef<FormattedIconFieldRef>(null);

    let address;
    if(activity?.SpatialInfo != null){
        address = activity?.SpatialInfo?.Address ?? ""
    } else if(activity?.PoiInfo != null) {
        address = activity?.PoiInfo?.Address ?? "";
    } else {
        address = "";
    }

    const coreNodeRef = useRef<CoreNodeRef>(null);

    const spatialFields = [ 
        { variable: 'country', label: 'Country', value: activity?.Country ?? "", editable:true },
        { variable: 'city',label: 'City', value: activity?.City ?? "", editable:true },
        { variable: 'address',label: 'Address', value: address, editable:true },                
    ];

    //not sure how to use this
    const temporalRef = useRef<FormattedIconFieldRef>(null);
    const temporalFields = [ 
        { variable: 'startDate', label: 'Start Date', value: activity?.StartDate ?? "", editable:false },
        { variable: 'endDate',label: 'End Date', value: activity?.EndDate ?? "", editable:false },        
    ];

    const contentRef = useRef<FormattedIconFieldRef>(null);
    const contentFields = [ 
        { variable: 'performer', label: 'Performer', value: activity?.ContentInfo?.PerformerName ??  "", editable:true},        
        { variable: 'category', label: 'Category', value: activity?.ContentInfo?.Category ??  "", editable:true}, 
        { variable: 'venue', label: 'Venue', value: activity?.SpatialInfo?.VenueName ?? "", editable:true },         
    ];

    const commercialRef = useRef<FormattedIconFieldRef>(null);
    const commercialFields = [ 
        { variable: 'price', label: 'Price', value: activity?.CommercialInfo?.Price ?? "", editable:true},        
        { variable: 'availability', label: 'Availability', value: activity?.CommercialInfo?.Availability ?? "", editable:true}, 
        { variable: 'website', label: 'Website', value: activity?.CommercialInfo?.Website ?? "", editable:false},         
    ];

    const poiRef = useRef<FormattedIconFieldRef>(null); 
    const poiFields = [ 
        { variable: 'allCategories', label: 'Place category', value: activity?.PoiInfo?.AllCategories ?? "", editable:false},        
        { variable: 'free', label: 'Free', value: activity?.PoiInfo?.Free ?? "", editable:false}, 
        { variable: 'rating', label: 'Rating', value: activity?.PoiInfo?.Rating ?? "", editable:false},   
        { variable: 'poiWebsite',label: 'Website', value: activity?.PoiInfo?.WebsiteUrl ?? "", editable:false},       
    ];
    
    const collectFields = () => {   
        const spatialData = spatialRef.current?.getValues();

        const contentData = contentRef.current?.getValues();
        const commercialData = commercialRef.current?.getValues();
        const poiData = poiRef.current?.getValues(); 

        const coreNodeData = coreNodeRef.current?.getValues();  

        // console.log("pre spread fields", spatialData, temporalData, contentData, commercialData, poiData, coreNodeData);
        
        const allData = {
        label: activityTitle,
        ...coreNodeData     || {},
        ...spatialData      || {},       
        ...contentData      || {},
        ...commercialData   || {},
        ...poiData          || {},       
        };

        // console.log("all fields spread", allData);

        onSave(allData);        
    }

    return (
    <>
        <div className="grid grid-cols-10 gap-4 p-6 overflow-auto">
           
             <div className="flex flex-col col-span-5 items-start  mx-auto  w-full">
                    <MuiStyledTextField
                        fullWidth
                        
                        required
                        size='small'                     
                        id="basic"
                        label="Title"
                        placeholder="Whatsup?"
                        value={activityTitle}
                        onChange={(e) => setActivityTitle(e.currentTarget.value)}
                        variant="standard"
                        className="w-full"
                        themeProps={{
                            paletteProfile: 'main',
                            borderProfile: 'semiStraight',
                            spacingProfile: 'medium',
                            mode: 'light',
                            fontSize: '16px',
                            labelFontSize: '12px',
                            labelOpacity: 0.85,
                            helperTextFontSize:'11px',
                            helperTextOpacity:0.6                                 
                        }}
                    />                
            </div>
                        
            <div className="flex flex-row col-span-5 gap-2 items-end justify-end">
                <MuiStyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'main' borderType = 'semiStraight' 
                    opacity={1.0} highlightBorderOnHover={true} highlightBackgroundOnHover={true} applyThemeFontColor={true} textOpacity={1.0}        
                    onClick={() => {console.log("clicked")}}
                    >
                    <Trash size={16} style={{ marginLeft: '0', marginRight: '.25rem', opacity:0.85 }}/>
                    <Typography 
                            variant="body2" 
                            color="inherit"                     
                            > 
                            Delete
                        </Typography>            
                </MuiStyledButton>

                <MuiStyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'main' borderType = 'semiStraight' 
                    opacity={1.0} highlightBorderOnHover={true} highlightBackgroundOnHover={true} applyThemeFontColor={true} textOpacity={1.0}        
                    onClick={() => {console.log("clicked")}}
                    >
                    <BookHeart size={16} style={{ marginLeft: '0', marginRight: '.25rem', opacity:0.85 }}/>
                    <Typography 
                            variant="body2" 
                            color="inherit"                     
                            > 
                            Favorite
                        </Typography>            
                </MuiStyledButton>


                 <MuiStyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'harmonicBlue' borderType = 'semiStraight' 
                    opacity={1.0} highlightBorderOnHover={true} highlightBackgroundOnHover={true} applyThemeFontColor={true} textOpacity={1.0}        
                    onClick={() => {console.log("clicked")}}
                    >
                    <FileBox size={16} style={{ marginLeft: '0', marginRight: '.25rem', opacity:0.85 }}/>
                    <Typography 
                            variant="body2" 
                            color="inherit"                     
                            > 
                            Save/Update
                    </Typography>            
                    </MuiStyledButton>
                </div>          
   

                <div className="col-span-6 w-full mb-4 items-center justify-center p-4">
                    <CoreNodeDisplay ref={coreNodeRef}/>
                </div>
                <div className="flex flex-col col-span-4 items-center justify-center mt-2 p-4">                  
                
                {imageUrl && (
                    <CardMedia
                    component="img"
                    height="90"
                    image={imageUrl}
                    alt={activity.ContentInfo.Genre || 'Event'}
                    className="aspect-video w-full object-cover"
                    />
                )}
                        
                </div>
                <div className="col-span-10 p-2">
                     <Typography variant="body2" color="text.secondary">
                                    Activity details
                    </Typography>  
                </div>

                <div className="col-span-5 w-full">
                

                <div className="mb-8 p-4 rounded-3xl  border border-slate-200" >
                    <FormattedIconField ref={spatialRef} icon={MapPin} inputFields={spatialFields} label="Location" fixedHeight={formFieldContainerHeight}/>                
                </div> 

                <div className="mb-8 p-4 rounded-3xl  border border-slate-200" >
                    <FormattedIconField ref={contentRef} icon={Guitar} inputFields={contentFields} label="Entertainment" fixedHeight={formFieldContainerHeight}/>              
                </div>


                </div>
                <div className="col-span-5 w-full">
                      <div className="mb-8 p-4 rounded-3xl  border border-slate-200" >
                        <FormattedIconField ref={commercialRef} icon={ChartBarStacked} inputFields={commercialFields} label="Commercial" fixedHeight={formFieldContainerHeight}/>                
                    </div>

                    <div className="mb-8 p-4 rounded-3xl  border border-slate-200">
                        <FormattedIconField ref={poiRef} icon={Store} inputFields={poiFields} label="Place" fixedHeight={formFieldContainerHeight}/>                
                    </div>
                </div>

                </div>
      
        </>
    );  
}


export default ActivityDisplayData;


