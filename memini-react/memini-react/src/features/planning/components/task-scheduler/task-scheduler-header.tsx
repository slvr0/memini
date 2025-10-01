import { useState, useEffect, useRef, forwardRef,createRef } from "react";
import { MuiDatePickerRef } from "../../../general/interfaces/general-types";
import MuiDatePicker from "../../../general/components/mui-date-picker";
import { Typography, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import MuiStyledSelect from "../../../../mui-wrappers/mui-select-wrapper";

interface TaskSchedulerContentHeaderSelectionProps  {
    defaultValue?: number;
    onChange?: (value: number) => void;
}

const weekNumbers = Array.from({ length: 52 }, (_, i) => i + 1);

const TaskSchedulerHeader : React.FC<TaskSchedulerContentHeaderSelectionProps> = (props) => {
    const taskDateRef   = createRef<MuiDatePickerRef>();
    const [selectedWeek, setSelectedWeek] = useState<number>(props.defaultValue ?? 39);
    
     const handleChange = (event: any) => {
        const value = event.target.value as number;
        setSelectedWeek(value);
        props.onChange?.(value); 
    };
    
    return ( 
    
        <div className="scheduler-content-header h-20 border-b border-b-bg-gray-100">
            <div className="grid grid-cols-6 items-center h-full mx-2">
                <div className="flex col-span-1">
                    <Typography variant="h5" className="font-semibold opacity-80">
                    Planning
                    </Typography>
                </div>

                <div className="flex col-span-5 items-center justify-end">
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="select-label">Week</InputLabel>
                        <MuiStyledSelect
                            labelId="select-label"
                            id="select"
                            value={selectedWeek}
                            label="Number"
                            onChange={handleChange}
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

export default TaskSchedulerHeader;