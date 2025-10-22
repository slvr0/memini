
import FormGroup from '@mui/material/FormGroup';    
import { Switch, FormControlLabel, Typography, Paper } from "@mui/material";
import MuiStyledTextField from "../../../../mui-wrappers/mui-textfield-wrapper";
import MuiStyledDatePicker from "../../../../mui-wrappers/mui-datepicker-wrapper";
import dayjs, { Dayjs } from 'dayjs';
import { MapPinned, Hourglass } from 'lucide-react';
import { useState } from "react";   
import MuiStyledButton from '../../../../mui-wrappers/mui-button-wrapper';
import LucidIconButton from "../../../../lucid/lucid-button-icon";

interface TimespanFilterProps {
    selectedTimespan?: number;
    onChange?: (newValue: number) => void;
}

const isSelected = (selectedTimespan: number | undefined, value: number) => selectedTimespan === value;  

//the selected value is a usestate from parent such that changes will re-render parent and child giving a new selection update.
const TimespanFilter: React.FC<TimespanFilterProps> = (props) => { 
    return (<>
        <MuiStyledButton 
            themeColor='light' 
            buttonSize='xs' 
            buttonVariant={isSelected(props.selectedTimespan, -7) ? 'meminiThemeOutline' : 'main'} 
            borderType='square' opacity={.85} 
            onClick={() => props.onChange && props.onChange(-7)}>
            <Typography variant="caption" fontSize={10}> past week </Typography>
        </MuiStyledButton>

        <LucidIconButton
            icon={Hourglass}
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

        <MuiStyledButton         
            themeColor='light' 
            buttonSize='xs' 
            buttonVariant={isSelected(props.selectedTimespan, 7) ? 'meminiThemeOutline' : 'main'} 
            borderType='square' opacity={.85} 
            onClick={() => props.onChange && props.onChange(7)}> 
            <Typography variant="caption" fontSize={10}> 1 week </Typography>
        </MuiStyledButton>
        
        <MuiStyledButton
            themeColor='light' 
            buttonSize='xs' 
            buttonVariant={isSelected(props.selectedTimespan, 30) ? 'meminiThemeOutline' : 'main'} 
            borderType='square' opacity={.85} 
            onClick={() => props.onChange && props.onChange(30)}> 
            <Typography variant="caption" fontSize={10}> 1 month </Typography>
        </MuiStyledButton>
        
        <MuiStyledButton 
            themeColor='light' 
            buttonSize='xs' 
            buttonVariant={isSelected(props.selectedTimespan, 90) ? 'meminiThemeOutline' : 'main'} 
            borderType='square' opacity={.85} 
            onClick={() => props.onChange && props.onChange(90)}> 
            <Typography variant="caption" fontSize={10}> 3 months </Typography>
        </MuiStyledButton>
        
        <MuiStyledButton 
            themeColor='light' 
            buttonSize='xs' 
            buttonVariant={isSelected(props.selectedTimespan, 365) ? 'meminiThemeOutline' : 'main'} 
            borderType='square' opacity={.85} 
            onClick={() => props.onChange && props.onChange(365)}> 
            <Typography variant="caption" fontSize={10}> all </Typography>
        </MuiStyledButton>
    </>);
}

export default TimespanFilter;