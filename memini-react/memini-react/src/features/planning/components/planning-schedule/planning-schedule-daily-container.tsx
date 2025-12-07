
import {ICalendarDate} from "../../../../interfaces/common-interfaces"
import { calculateTaskPixelTime, calculateActivityDisplayMetrics } from "../../computes/task-scheduler-computations"

import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { act, useMemo, useRef } from 'react';
import "../../css/task-scheduler.css"
import { Activity, IDisplayActivity } from "@/features/activity/interface/activity";
import { DragItemType } from "../../../activity/components/display-activity/display-activity";
import DisplayActivity from "../../../activity/components/display-activity/display-activity";
import { useActivityStore } from "../../../activity/store/activity-store"
import dayjs from "dayjs";
import { getActivitiesForDate } from "@/services/activity-service";

const hourGridSvg = (height: number) => {
    const hourHeight = height / 24;
    return `data:image/svg+xml,%3Csvg width='100%25' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E${
        Array.from({ length: 24 }).map((_, i) => 
            `%3Cline x1='0' y1='${i * hourHeight}' x2='100%25' y2='${i * hourHeight}' stroke='%23e5e7eb' stroke-width='1' stroke-dasharray='8,4'/%3E`
        ).join('')
    }%3C/svg%3E`;
};

interface PlanningScheduleDailyContainerProps { 
    containerHeight: number;
    weekday: ICalendarDate;
   
    }

const PlanningScheduleDailyContainer: React.FC<PlanningScheduleDailyContainerProps> = ({
    containerHeight, 
    weekday,
}) => {
     const pixelsPerHour = containerHeight / 24;
    const dateAsJs = dayjs().year(weekday.year).month(weekday.month).date(weekday.day);   
    const activities = useActivityStore.getState().getActivitiesForDate(dateAsJs);    
    const displayActivities = calculateActivityDisplayMetrics(activities, pixelsPerHour);

    console.log("loaded activities", activities);

    const containerRef = useRef<HTMLDivElement>(null);  

    const [{ isOver }, drop] = useDrop(() => ({
        accept: DragItemType.ACTIVITY,
        drop: (item: { displayActivity: IDisplayActivity }, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const containerElement = containerRef.current;
            if (!containerElement) return;

            const rect = containerElement.getBoundingClientRect(); 
            const relativeY = clientOffset.y - rect.top;

            useActivityStore.getState().updateActivityFromDragEvent(item.displayActivity, weekday, relativeY, containerHeight);                 
        
            return;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [weekday, containerHeight]);

    drop(containerRef);

    return (        
    <div 
    ref={containerRef} 
        className={`relative flex flex-col h-full w-full border-r border-l border-r-gray-200 
                    transition-all duration-300 ease-in-out
                    ${isOver ? 'bg-slate-50 border-r-gray-400 border-l-gray-400' : ''}`}
        style={{
            backgroundImage: isOver ? `url("${hourGridSvg(containerHeight)}")` : 'none', 
            transition: 'all 0.3s ease-in-out, background-image 0.3s ease-in-out'
        }}>

        { displayActivities.map((activity: IDisplayActivity, index: number) => {
            return (<DisplayActivity
                key={index}  
                activity={activity}               
                />)
            })            
        } 

    </div>
    );
};

export default PlanningScheduleDailyContainer;