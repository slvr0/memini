
import PlanningScheduleTimemarkerDisplay from "./planning-schedule-timemarker-display"
import PlanningScheduleDailyContainer from "./planning-schedule-daily-container"
import PlanningScheduleWeekDaysHeader from "./planning-schedule-week-days-header";

import { Typography,Backdrop, CircularProgress } from "@mui/material";
import { Fragment } from "react/jsx-runtime"

import DragCursorLine from "./planning-schedule-drag-indication-line"
import {ICalendarDate} from "../../../../interfaces/common-interfaces"
import { useState, useRef, createRef } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Activity } from "@/features/activity/interface/activity";
import dayjs from "dayjs";
interface PlanningScheduleContentContainerProps  { 
    schedulerHeight: number;
    timeslotHeight: number;
    week: number;
    weekdays: Array<ICalendarDate>;
  
}

const PlanningScheduleContentContainer : React.FC<PlanningScheduleContentContainerProps> = (props) => {  
    
    const [dragState, setDragState] = useState<{
        isDragging: boolean;
        mouseY: number | null;
    }>({ isDragging: false, mouseY: null });

     const handleMouseMove = (e: React.MouseEvent) => {
        if (dragState.isDragging && schedulerRef.current) {
            const rect = schedulerRef.current.getBoundingClientRect();
            const relativeY = e.clientY - rect.top;
            setDragState(prev => ({ ...prev, mouseY: relativeY }));
        }
    };

    const schedulerRef = useRef<HTMLDivElement>(null);

    return (
        <>        
            <PlanningScheduleWeekDaysHeader 
                week={props.week}
                weekdays={props.weekdays}                        
            /> 
            <DndProvider backend={HTML5Backend}>
                <div 
                    ref={schedulerRef}
                    className={`grid bg-white z-5 items-center text-center border-b border-b-gray-100 ease-in duration-300`}                  
                    style={{ 
                        height: props.schedulerHeight,
                        gridTemplateColumns: `5% repeat(${props.weekdays.length}, 1fr)`                         
                    }}>

                    <DragCursorLine schedulerHeight={props.schedulerHeight} containerRef={schedulerRef}/>
                    
                    <PlanningScheduleTimemarkerDisplay 
                        timeslotHeight={props.timeslotHeight}
                        typographyVariant='subtitle2'
                    />
                    {
                        props.weekdays.map((weekday: ICalendarDate, i: number) => {
                                return (<PlanningScheduleDailyContainer key={i} 
                                    containerHeight={props.schedulerHeight} 
                                    weekday={weekday}                            
                                    
                                />);
                        })
                    }
                </div>
            </DndProvider>
        </>
      
    )
}

export default PlanningScheduleContentContainer;