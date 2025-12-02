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
import EditTaskForm from "../../planning/components/edit-task-form";
import CoreNodeDisplay, {CoreNodeRef} from './core-node-display';

import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText, CircleUserRound, LogOut, AtSign, Heart, UserRoundSearch, Check } from "lucide-react";

interface ActivityDisplayDataProps {
    activityNode?: any;
}

//have to set core node stuff also
const ActivityDisplayData : React.FC<ActivityDisplayDataProps> = ({activityNode}) => {  
    
    const activity = structuredClone(activityNode);
    const [activityTitle, setActivityTitle] = useState<string>(activity?.Label ?? "");

    // useEffect(() => {
    //      const fetchEvent = async () => {
    //         const eventResponse: any =  await getNodeByKeyApi(12730); 
    //         console.log(eventResponse);
    //         setEvent(eventResponse?.ResponseObject); 
    //         setActivityTitle(eventResponse?.ResponseObject?.Label ?? "");         
    //     }
    //     fetchEvent();
        
    // }, []); 

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
        { label: 'Location', value: activity?.Country ?? "", editable:true },
        { label: 'City', value: activity?.City ?? "", editable:true },
        { label: 'Address', value: address, editable:true },                
    ];

    const temporalRef = useRef<FormattedIconFieldRef>(null);
    const temporalFields = [ 
        { label: 'Start Date', value: activity?.StartDate ?? "", editable:false },
        { label: 'End Date', value: activity?.EndDate ?? "", editable:false },        
    ];

    const contentRef = useRef<FormattedIconFieldRef>(null);
    const contentFields = [ 
        { label: 'Performer', value: activity?.ContentInfo?.PerformerName ??  "", editable:true},        
        { label: 'Category', value: activity?.ContentInfo?.Category ??  "", editable:true}, 
        { label: 'Venue', value: activity?.SpatialInfo?.VenueName ?? "", editable:true },         
    ];

    const commercialRef = useRef<FormattedIconFieldRef>(null);
    const commercialFields = [ 
        { label: 'Price', value: activity?.CommercialInfo?.Price ?? "", editable:true},        
        { label: 'Availability', value: activity?.CommercialInfo?.Availability ?? "", editable:true}, 
        { label: 'Website', value: activity?.CommercialInfo?.Website ?? "", editable:false},         
    ];

    const poiRef = useRef<FormattedIconFieldRef>(null); 
    const poiFields = [ 
        { label: 'Place category', value: activity?.PoiInfo?.AllCategories ?? "", editable:false},        
        { label: 'Free', value: activity?.PoiInfo?.Free ?? "", editable:false}, 
        { label: 'Rating', value: activity?.PoiInfo?.Rating ?? "", editable:false},   
        { label: 'Website', value: activity?.PoiInfo?.WebsiteUrl ?? "", editable:false},       
    ];
    
    const collectAllFuckingData = () => {   
        const spatialData = spatialRef.current?.getValues();
        const temporalData = temporalRef.current?.getValues();
        const contentData = contentRef.current?.getValues();
        const commercialData = commercialRef.current?.getValues();
        const poiData = poiRef.current?.getValues(); 

        const coreNodeData = coreNodeRef.current?.getValues();  

        console.log(spatialData, temporalData, contentData, commercialData, poiData, coreNodeData);
    }

    return (
    <>
        <div className="grid grid-cols-4 gap-4">
           
             <div className="flex flex-col col-span-3 items-center justify-center mx-auto  w-full px-16">
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
             <div className="col-span-1 gap-1 items-center justify-center flex">
                    <LucidIconButton
                    className="p-2"
                    icon={Heart}
                    size={16}
                    opacity={.75}
                    palette="harmonicRed"
                    borderProfile="rounded"
                    highlightBackgroundOnHover={true}
                    highlightBorderOnHover={true}
                    displayBorder={true}
                    tooltip="Favorite"
                    onClick={() => {console.log("Clicked")}}
                    />
                    <LucidIconButton
                    className="p-2"
                    icon={Trash}
                    size={16}
                    opacity={.75}
                    palette="harmonicRed"
                    borderProfile="rounded"
                    highlightBackgroundOnHover={true}
                    highlightBorderOnHover={true}
                    displayBorder={true}
                    tooltip="Delete"
                    onClick={() => {console.log("Clicked")}}
                    />
                    <LucidIconButton
                    className="p-2"
                    icon={UserRoundSearch}
                    size={16}
                    opacity={.75}
                    palette="harmonicRed"
                    borderProfile="rounded"
                    highlightBackgroundOnHover={true}
                    highlightBorderOnHover={true}
                    displayBorder={true}
                    tooltip="Invite"
                    onClick={() => {console.log("Clicked")}}
                    />
                    <LucidIconButton
                    className="p-2 ml-4"
                    icon={Check}
                    size={16}
                    opacity={.75}
                    palette="harmonicGreen"
                    borderProfile="rounded"
                    highlightBackgroundOnHover={true}
                    highlightBorderOnHover={true}
                    displayBorder={true}
                    tooltip="Save activity"
                    onClick={() => {collectAllFuckingData()}}
                    />
                
            </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-4 h-full">
            <div className="col-span-3 w-full">

                <div className="mx-4 mb-8 p-4 rounded-3xl  border border-slate-200" >
                    <FormattedIconField ref={spatialRef} icon={MapPin} inputFields={spatialFields}/>                
                </div>
                <div className="mx-4 mb-8 p-4 rounded-3xl  border border-slate-200" >
                    <FormattedIconField ref={temporalRef} icon={ClockFading} inputFields={temporalFields}/>              
                </div>

                <div className="mx-4 mb-8 p-4 rounded-3xl  border border-slate-200" >
                    <FormattedIconField ref={contentRef} icon={Guitar} inputFields={contentFields}/>              
                </div>

                <div>
                    {imageUrl && (
                        <CardMedia
                        component="img"
                        height="180"
                        image={imageUrl}
                        alt={activity.ContentInfo.Genre || 'Event'}
                        className="aspect-video w-full object-cover px-4"
                        />
                    )}
                </div>

            </div>

            <div className="col-span-3 w-full">
                <div className="mx-4 mb-8 p-4 rounded-3xl  border border-slate-200" >
                    <FormattedIconField ref={commercialRef} icon={ChartBarStacked} inputFields={commercialFields}/>                
                </div>

                <div className="mx-4 mb-8 p-4 rounded-3xl  border border-slate-200" >
                    <FormattedIconField ref={poiRef} icon={Store} inputFields={poiFields}/>                
                </div>

            </div>

            <div className="col-span-3 w-full px-4">
              <CoreNodeDisplay ref={coreNodeRef}/>
            </div>

            <div className="col-span-3 w-full items-center justify-center px-4">
                
            </div>
        </div>

    </>
    );  
}


export default ActivityDisplayData;


