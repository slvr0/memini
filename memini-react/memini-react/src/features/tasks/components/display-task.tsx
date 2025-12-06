
import {TaskLayoutProps,  IDisplayTask, ITask} from '../../../features/tasks/interfaces/task-interface'

import TaskLayoutCompact from './layouts/task-layout-compact'
import TaskLayoutMini from './layouts/task-layout-mini'
import TaskLayoutMedium from './layouts/task-layout-medium'

import { useDrag } from 'react-dnd';
import { useRef, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useTaskManager } from "../../tasks/utils/task-manager"
import { minutesToHHMM,mninutesToHHMM_APM  } from "../../tasks/computes/time-display-formatting";
import { TaskStatus } from '../../../mui-wrappers/mui-status-circle-wrapper';


const getHeightCategory = (height: number) => {
    if (height < 20) return 'compact';
    if (height < 40) return 'mini';
    if (height < 80) return 'medium';
    return 'medium'; //create a large layout too?
}

export const DragItemType = {
  TASK: 'displaytask'
} as const;

const getTaskLayout = (height: number, slotCount: number, props: TaskLayoutProps): JSX.Element => {
  const category = getHeightCategory(height);
  
  switch(category) {
    case 'compact':
      return <TaskLayoutCompact displayOptions={slotCount === 1}  {...props} />;
    case 'mini':
      return <TaskLayoutMini displayOptions={slotCount === 1} {...props} />;
    case 'medium':
      return <TaskLayoutMedium {...props} />;
    default:
      return <TaskLayoutMedium {...props} />;
  }
};

interface IDisplayTaskCompositionProps {
  displayTask: IDisplayTask;
  className?: string;
}

//Add parameter to shut off height / top calculation for use in lists etc.
const DisplayTask : React.FC<IDisplayTaskCompositionProps> = (props) => {  
    const {setSelectedTask, deleteTask} = useTaskManager();
    const ref = useRef<HTMLDivElement>(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const taskWidth = `${(props.displayTask.slotSpan || 1) / props.displayTask.slotCount * 100}`;
    const taskLeft = `${props.displayTask.slotIndex / props.displayTask.slotCount * 100}`; 
    
    const onEditTask = () => {
      setSelectedTask(props.displayTask as ITask);
    }
    
    const [{ isDragging }, drag] = useDrag(() => ({
      type: DragItemType.TASK,
      item: () => {
          setTooltipOpen(false);
          return { displayTask: props.displayTask };
      },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),          
      }),
    }), [props.displayTask]);

    const startTimeDisplayFormat = minutesToHHMM(props.displayTask.StartTime);
    const endTimeDisplayFormat = minutesToHHMM(props.displayTask.EndTime);
  
    return (
          <Tooltip
              title={
                `${startTimeDisplayFormat} - ${endTimeDisplayFormat} | ${props.displayTask.Title}` +
                (props.displayTask.Description ? " - " + props.displayTask.Description : "")
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
                top: props.displayTask.yPosition,
                height: props.displayTask.height,
                left: `${taskLeft}%`,
                width: `${taskWidth}%`,
            }}>

              {getTaskLayout(
                  props.displayTask.height ?? 0, 
                  props.displayTask.slotCount,                          
                  { 
                  taskTitle: props.displayTask.Title, 
                  taskDescription: props.displayTask.Description, 
                  status: props.displayTask.status ?? TaskStatus.PASSED,  
                  displayTime: mninutesToHHMM_APM(props.displayTask.StartTime)                            
              })}
          
        </div> 
          </Tooltip>   
    ) 
}

export default DisplayTask;