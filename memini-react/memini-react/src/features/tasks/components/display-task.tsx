
import {TaskLayoutProps,  IDisplayTask} from '../../../features/tasks/interfaces/task-interface'

import TaskLayoutCompact from './layouts/task-layout-compact'
import TaskLayoutMini from './layouts/task-layout-mini'
import TaskLayoutMedium from './layouts/task-layout-medium'

//stackedProfile , can be in columns i guess if multiple are at same time.
//status icon , coming soon, passed, or future. coming soon , orange, passed gray ish , coming soon blue.

const getHeightCategory = (height: number) => {
    if (height < 20) return 'compact';
    if (height < 40) return 'mini';
    if (height < 80) return 'medium';
    return 'medium'; //create a large layout too?
}

const getTaskLayout = (height: number, slotCount: number, props: TaskLayoutProps): JSX.Element => {
  const category = getHeightCategory(height);
  
  switch(category) {
    case 'compact':
      return <TaskLayoutCompact displayOptions={slotCount === 1} {...props} />;
    case 'mini':
      return <TaskLayoutMini displayOptions={slotCount === 1} {...props} />;
    case 'medium':
      return <TaskLayoutMedium {...props} />;
    default:
      return <TaskLayoutMedium {...props} />;
  }
};

//Add parameter to shut off height / top calculation for use in lists etc.
const DisplayTask : React.FC<IDisplayTask> = (props) => {
    // const widthPercent = 100 / props.slotCount;
    // const leftPercent = props.slotIndex * widthPercent;

    const taskWidth = `${(props.slotSpan || 1) / props.slotCount * 100}`;
    const taskLeft = `${props.slotIndex / props.slotCount * 100}`;

    return (
        <div className="absolute h-full min-w-0 overflow-hidden border-solid rounded-md accent-transparent transition-all duration-300 " 
            style={{                
                borderColor: '#9ccec4',
                borderWidth: '1.5px',              
                top: props.yPosition,
                height: props.height,
                left: `${taskLeft}%`,
                width: `${taskWidth}%`,
                backdropFilter: 'blur(2px)', 
            }}>
            {getTaskLayout(
                props.height, props.slotCount, { 
                taskTitle: props.Title, 
                taskDescription: props.Description, 
                status: props.status
            })}
        </div>    
    ) 
}

export default DisplayTask;