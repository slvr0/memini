
import {TaskLayoutProps, DisplayTaskProps} from '../../../features/tasks/interfaces/task-interface'

import TaskLayoutCompact from './layouts/task-layout-compact'
import TaskLayoutMini from './layouts/task-layout-mini'
import TaskLayoutMedium from './layouts/task-layout-medium'

//stackedProfile , can be in columns i guess if multiple are at same time.
//status icon , coming soon, passed, or future. coming soon , orange, passed gray ish , coming soon blue.

const getHeightCategory = (height: number) => {
    if (height < 20) return 'ultra-compact';
    if (height < 40) return 'compact';
    if (height < 80) return 'medium';
    return 'medium'; //create a large layout too?
}

const getTaskLayout = (height: number, props: TaskLayoutProps): JSX.Element => {
  const category = getHeightCategory(height);
  
  switch(category) {
    case 'ultra-compact':
      return <TaskLayoutCompact {...props} />;
    case 'compact':
      return <TaskLayoutMini {...props} />;
    case 'medium':
      return <TaskLayoutMedium {...props} />;
    default:
      return <TaskLayoutMedium {...props} />;
  }
};

//Add parameter to shut off height / top calculation for use in lists etc.
const DisplayTask : React.FC<DisplayTaskProps> = (props) => {

    var yPos = (props.startTime / 60) * props.hourPixel;
    var height = ((props.endTime - props.startTime) / 60) * props.hourPixel;

    return (
        <div className="border rounded-md accent-transparent transition-all duration-300" 
            style={{                
                borderColor: '#9ccec4',
                borderWidth: '1.5px',
                position: 'relative',
                top: yPos,
                height: height,
                backdropFilter: 'blur(2px)', 
            }}>
            {getTaskLayout(height, { 
                taskTitle: props.taskTitle, 
                taskDescription: props.taskDescription, 
                status: props.status 
            })}
        </div>    
    ) 
}

export default DisplayTask;