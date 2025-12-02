import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react';

import MUI_StyledSegment from '../../../mui-wrappers/mui-segment-wrapper';
import LucidIconButton from '../../../lucid/lucid-button-icon';
import { Bell, HelpCircle, MessageSquareText, Settings, Codepen, MapPin } from 'lucide-react';
import { Typography } from '@mui/material';

import {Modal, Box} from '@mui/material';
//one specific layout TOP / LEFT MID RIGHT undersections then user chat to the right.
import MuiStyledTextField from "../../../mui-wrappers/mui-textfield-wrapper";
import MuiStyledDatePicker from "../../../mui-wrappers/mui-datepicker-wrapper";
import { LucideProps } from "lucide-react";



const FORMFIELD_PRESETS_1 =  {
    paletteProfile: 'main',
    borderProfile: 'semiStraight',
    spacingProfile: 'medium',
    mode: 'light',
    fontSize: '11px',
    labelFontSize: '11px', 
    labelOpacity:1.0,                     
    helperTextFontSize:'10px',
    helperTextOpacity:0.6,
    borderOpacity: 0.6 

} as const; 


interface fieldInput {
    label: string;
    value: string | number | boolean | Date;
    editable?: boolean;
}

interface FormattedIconFieldProps {
    icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    label? : string;
    inputFields : fieldInput[]
}

export interface FormattedIconFieldRef {
    getValues: () => void;  
}

const FormattedIconField = forwardRef<FormattedIconFieldRef, FormattedIconFieldProps>(
    (props, ref) => {
        const { icon: Icon, label, inputFields } = props; 
        const [values, setValues] = useState<fieldInput[]>(inputFields);
        
        useEffect( () => {
             setValues(inputFields)
        }, [inputFields]);

        useImperativeHandle(ref, () => {
            return {
                getValues() {
                    return Object.fromEntries(
                        values.map(field => [field.label, field.value])
                    ) as Record<string, string | number | boolean | Date>;                 
                }
            };
        });

        const onUpdateFieldValue = (index: number, newValue: string | number | boolean | Date) => {
            const updatedValues = [...values];
            updatedValues[index].value = newValue;
            setValues(updatedValues);
        }

        const formatOutput = (value: any) : string => {
            if(typeof value === 'boolean')
                return value ? "Yes" : "No";
            else
                return value.toString();            
        }   

        return (            
            <div className="grid grid-cols-4 gap-4">  
                <div className="flex col-span-1 items-center justify-center">
                <div className="bg-miInfoBoxBackgroundStrong rounded-xl p-3">
                    <Icon size={24} className="text-black opacity-50" />
                </div>
                </div>
                <div className="flex flex-col col-span-3 justify-center">                
                    {
                        values.map((field, index) => (
                            <div key={index} className="grid grid-cols-1 justify-center items-center mt-2">

                                { field.editable && 
                                    <MuiStyledTextField  
                                        fullWidth                
                                        size='small'
                                        id="outlined"
                                        label={field.label}
                                        placeholder="Place to go"
                                        value={formatOutput(field.value)}
                                        onChange={(e) => {onUpdateFieldValue(index, e.target.value)}}
                                        variant="standard"
                                        themeProps={FORMFIELD_PRESETS_1}
                                    />
                                }

                                {
                                    !field.editable && 
                                    <Typography variant="subtitle2" className="text-black opacity-75 break-words overflow-wrap">
                                        <strong>{field.label}:</strong> {field.value.toString()}
                                    </Typography>
                                }
                            
                            </div> 
                        ))
                    }     
                </div>
            </div>
        );
    }
);

export default FormattedIconField;