import PlanningScheduleTimemarkerDisplay from "./planning-schedule-timemarker-display"
import PlanningScheduleDailyContainer from "./planning-schedule-daily-container"
import PlanningScheduleHeader from "./planning-schedule-header"
import PlanningScheduleContentContainer from "./planning-schedule-content-container"
import PlanningScheduleContainerLoading from "./planning-schedule-container-loading"

import { useState, useEffect, useRef, forwardRef, Fragment, useMemo } from "react";


import { getWeekDates } from "../../computes/task-scheduler-computations"


import {ICalendarDate} from "../../../../interfaces/common-interfaces"

import { getWeek } from 'date-fns';

import dayjs from "dayjs"
import { useActivityStore } from "../../../activity/store/activity-store"

interface PlanningScheduleContainerProps { 
    schedulerHeight: number;
    timeslotHeight: number;
}

//add a screen zoom listener to adjust overflow if user zooms in too much.
const PlanningScheduleContainer = forwardRef<HTMLDivElement, PlanningScheduleContainerProps>((props, ref) => {

    /*
        New structure
    */
    const [selectedWeek, setSelectedWeek] = useState<number>(getWeek(new Date()) - 1)
    const isValidSchedulerParentRef = (ref: React.RefObject<HTMLDivElement | null> ) =>  ref && typeof ref === 'object' && ref.current;  
    
    const loading = useActivityStore(state => state.loading);
    const error = useActivityStore(state => state.error);

    const weekdays : ICalendarDate[] = getWeekDates(2025, selectedWeek);

    // Convert weekdays to dayjs objects for filtering
    const weekdaysDayjs = useMemo(() => 
        weekdays.map(day => 
            dayjs().year(day.year).month(day.month).date(day.day)
        ), 
        [weekdays]
    );   

    useEffect(()  => {
        const fetchActivitiesForSelectedPeriod = async () => {
             useActivityStore.getState().loadActivitiesForDateRange(weekdaysDayjs[0], weekdaysDayjs[weekdaysDayjs.length - 1]);
            //await loadActivitiesForDateRange(weekdaysDayjs[0], weekdaysDayjs[weekdaysDayjs.length - 1]);
        }

        fetchActivitiesForSelectedPeriod();
    }, [selectedWeek]);

    const handleDateSelectionChange = (selectedWeek: number) => setSelectedWeek(selectedWeek);
    
    return ( 
        <Fragment>
            {/* Should probably remove the content header and scaffold from container, it doesnt need re-render when tasks update.*/}
            <PlanningScheduleHeader 
                defaultValue={selectedWeek}
                onChange={(selectedWeek: number) => {
                    handleDateSelectionChange(selectedWeek)
                }}

                weekdaysDisplay={weekdays}
            />
            {loading ? (
                <PlanningScheduleContainerLoading />
            ) : (
                
                <PlanningScheduleContentContainer 
                    schedulerHeight={props.schedulerHeight} 
                    timeslotHeight={props.timeslotHeight} 
          
                    week={selectedWeek}
                    weekdays={weekdays}   
                  
                />
            )}
        </Fragment>
    ) 
});



export default PlanningScheduleContainer;