import type { IDisplayTask, ITask } from "../../../tasks/interfaces/task-interface";
import DisplayTask from "../../../tasks/components/display-task"
import { calculateTaskDisplayMetricsSimple } from "../../computes/task-scheduler-computations"

interface TaskDailyContainerProps { 
    containerHeight: number;
    displayTasks?: Array<ITask>;    
    simulatedSlotSpan? : number;
}

/* This guy should handle positional calculations */
const TaskDailyContainer: React.FC<TaskDailyContainerProps> = ({
    containerHeight, 
    displayTasks = [], // rename these as they arent displaytasks yet.
    simulatedSlotSpan = 1
}) => {

    const pixelsPerHour = containerHeight / 24;
    const displayTasks__ = calculateTaskDisplayMetricsSimple(displayTasks, pixelsPerHour);

    return (        
        <div className="relative flex flex-col h-full w-full border-r border-r-gray-200" >            {
                displayTasks__.map((task: IDisplayTask, index: number) => {
                    // const yPos = (task.StartTime / 60) * hourPixel;
                    // const height = ((task.EndTime - task.StartTime) / 60) * hourPixel;

                    return (<DisplayTask
                        key={index}                          
                        //TASK
                        {...task}

                        //DISPLAYTASK METRICS, ALREADY CALCULATED:..
                        // yPosition={yPos}
                        // height={height}
                        // slotIndex={index % simulatedSlotSpan}
                        // slotCount={simulatedSlotSpan}
                        
                        // slotIndex={0} //mocking
                        // slotCount={1}
                        />)
                })            
            }            
        </div>
    );
};

export default TaskDailyContainer;