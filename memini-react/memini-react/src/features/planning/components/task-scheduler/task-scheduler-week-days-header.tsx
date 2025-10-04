
import { ICalendarDate } from "@/interfaces/common-interfaces";
import { Typography } from "@mui/material";
import {WeekDaysEnum} from "../../computes/date-computations"

interface TaskSchedulerWeekDaysHeaderProps {
    week : number;
    weekdays: ICalendarDate[]; //weekdays of selection
}

const TaskSchedulerWeekDaysHeader : React.FC<TaskSchedulerWeekDaysHeaderProps> = (props) => {
    const calendarDateDayDisplay = (calendarDate: ICalendarDate) : string => WeekDaysEnum[calendarDate.weekDay];
    return (        
        <>
            <div 
                className={`grid h-12 items-center text-center border-b border-b-gray-100 sticky top-0 bg-white z-10 ease-in duration-300`}
                style={{
                    gridTemplateColumns: `5% repeat(${props.weekdays.length}, 1fr)` 
                }}
            > 
                   <>
                        <div className="flex flex-col justify-center h-full border-r border-r-gray-100 overflow-hidden">
                            <Typography variant="overline" className="truncate opacity-85">
                                Week {props.week}
                            </Typography>
                        </div>

                        {props.weekdays.map((day: ICalendarDate, i: number) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center h-full overflow-hidden border-r border-r-gray-100"
                            >                                
                                <Typography variant="overline" className="opacity-90">
                                    <span>
                                        {calendarDateDayDisplay(day)}   
                                    </span>
                                    
                                    <span className="ml-2">
                                    {new Date(2024, day.month, day.day).toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric', 
                                    })}

                                    </span>
                              
                                </Typography>
                               
                            </div>
                        ))}
                    </>
               
            </div>
        </>
    ) 
}

export default TaskSchedulerWeekDaysHeader;