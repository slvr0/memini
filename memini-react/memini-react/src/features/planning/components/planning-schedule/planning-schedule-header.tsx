import { useState, useEffect, useRef, forwardRef,createRef } from "react";

import { Typography, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import MuiStyledSelect from "../../../../mui-wrappers/mui-select-wrapper";
import { SelectChangeEvent } from "@mui/material";
import { ICalendarDate } from "@/interfaces/common-interfaces";
interface TaskSchedulerContentHeaderSelectionProps  {
    defaultValue?: number;
    onChange?: (value: number) => void;    
    weekdaysDisplay: ICalendarDate[];
}

const weekNumbers = Array.from({ length: 52 }, (_, i) => i + 1);

const PlanningScheduleHeader : React.FC<TaskSchedulerContentHeaderSelectionProps> = (props) => {
  
    return ( 
    
        <div className="scheduler-content-header h-20 border-b border-b-bg-gray-100">
            <div className="grid grid-cols-6 items-center h-full mx-2">
                <div className="flex col-span-1">
                    <Typography variant="h5" className="font-semibold opacity-80">
                    Planning
                    </Typography>
                </div>

                <div className="flex col-span-4 items-center justify-center gap-4 ">
                    <Typography variant="body2">
                        {new Date(
                            props.weekdaysDisplay[0].year, 
                            props.weekdaysDisplay[0].month, 
                            props.weekdaysDisplay[0].day
                        ).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                        })}
                    </Typography>
                    {   props.weekdaysDisplay.length > 0 &&
                        <>
                            <Typography variant="body2">
                            -
                            </Typography>

                            <Typography variant="body2">
                                {new Date(
                                    props.weekdaysDisplay[props.weekdaysDisplay.length - 1].year, 
                                    props.weekdaysDisplay[props.weekdaysDisplay.length - 1].month, 
                                    props.weekdaysDisplay[props.weekdaysDisplay.length - 1].day
                                ).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                })}
                            </Typography>                
                        </>
                    }

                    
                </div>

                <div className="flex col-span-1 items-center justify-end">
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="select-label">Week</InputLabel>
                        <MuiStyledSelect
                            labelId="select-label"
                            id="select"
                            value={props.defaultValue}
                            label="Number"
                            onChange={(e: any) => { 
                                const value = typeof e.target.value === 'number' 
                                    ? e.target.value 
                                    : Number(e.target.value);
                                props.onChange?.(value);
                            }}
                            themeProps={{
                                paletteProfile: 'main',
                                borderProfile: 'semiStraight',
                                mode: 'light',
                                fontSize: '10px',
                                menuItemFontSize: '10px',
                                scrollbarWidth: '1px',
                            }}
                        >
                            {weekNumbers.map((number) => (
                            <MenuItem key={number} value={number}>
                                {number}
                            </MenuItem>
                            ))}
                        </MuiStyledSelect>
                        </FormControl>
                </div>
            </div>
                            
        </div>
    )
}

export default PlanningScheduleHeader;