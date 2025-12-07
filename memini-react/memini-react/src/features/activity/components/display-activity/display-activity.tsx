

import DisplayActivityCompact from './display-activity-compact'
import DisplayActivityMini from './display-activity-mini'
import DisplayActivityMedium from './display-activity-medium'

import { useDrag } from 'react-dnd';
import { useRef, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

import { minutesToHHMM, mninutesToHHMM_APM  } from "../../../tasks/computes/time-display-formatting";
import { IDisplayActivity } from '../../interface/activity';

export interface DisplayLayoutProps {
    label: string;
    description?: string; 
    displaytime? : string;
}

const getHeightCategory = (height: number) => {
    if (height < 20) return 'compact';
    if (height < 40) return 'mini';
    if (height < 80) return 'medium';
    return 'medium'; //create a large layout too?
}

export const DragItemType = {
  TASK: 'displaytask',
  ACTIVITY: 'displayactivity'
} as const;

const getTaskLayout = (height: number, slotCount: number, props: DisplayLayoutProps): JSX.Element => {
  const category = getHeightCategory(height);
  
  switch(category) {
    case 'compact':
      return <DisplayActivityCompact {...props} />;
    case 'mini':
      return <DisplayActivityMini  {...props} />;
    case 'medium':
      return <DisplayActivityMedium {...props} />;
    default:
      return <DisplayActivityMedium {...props} />;
  }
};

interface IDisplayActivityCompositionProps {
  activity: IDisplayActivity;
  className?: string;
}

//Add parameter to shut off height / top calculation for use in lists etc.
const DisplayActivity : React.FC<IDisplayActivityCompositionProps> = (props) => { 
    const ref = useRef<HTMLDivElement>(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const taskWidth = `${(props.activity.slotSpan || 1) / props.activity.slotCount * 100}`;
    const taskLeft = `${props.activity.slotIndex / props.activity.slotCount * 100}`; 
    
    const onEditTask = () => {
    //   setSelectedTask(props.activity as IDisplayActivity);
    }
    
    const [{ isDragging }, drag] = useDrag(() => ({
      type: DragItemType.ACTIVITY,
      item: () => {
          setTooltipOpen(false);
          return { displayActivity: props.activity };
      },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),          
      }),
    }), [props.activity]);

    const startTimeDisplayFormat = minutesToHHMM(props.activity.StartTime);
    const endTimeDisplayFormat = minutesToHHMM(props.activity.EndTime);
  
    return (
          <Tooltip
              title={
                `${startTimeDisplayFormat} - ${endTimeDisplayFormat} | ${props.activity.Label}` +
                (props.activity.Description ? " - " + props.activity.Description : "")
              }
              arrow
              open={tooltipOpen}
              onOpen={() => setTooltipOpen(true)}
              onClose={() => setTooltipOpen(false)}
              disableHoverListener={isDragging}              
            >
        <div className="absolute h-full min-w-0 overflow-hidden border-dashed rounded-md transition-all duration-800 ease-in-out  bg-white border-miTaskHBR
            hover:border-solid !hover:border-2 hover:animate-pulse hover:shadow-lg hover:bg-miTaskHL" 
            
            onClick={() => onEditTask()}
            ref={drag as any}
            style={{  
                borderWidth: 1.5,      
                top: props.activity.yPosition,
                height: props.activity.height,
                left: `${taskLeft}%`,
                width: `${taskWidth}%`,
            }}>

              {getTaskLayout(
                  props.activity.height ?? 0, 
                  props.activity.slotCount,                          
                  { 
                  label: props.activity.Label, 
                  description: props.activity.Description,   
                  displaytime: mninutesToHHMM_APM(props.activity.StartTime)                            
              })}
          
        </div> 
          </Tooltip>   
    ) 
}

export default DisplayActivity;