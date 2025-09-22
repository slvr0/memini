import type { ITask } from "../../../tasks/interfaces/task-interface";
import DisplayTask from "../../../tasks/components/display-task"

interface TaskDailyContainerProps {
    containerHeight: number;
    containerIndex: number;
    displayTasks?: Array<ITask>;    
    simulatedSlotSpan? : number;
}

/* This guy should handle positional calculations */
const TaskDailyContainer: React.FC<TaskDailyContainerProps> = ({
    containerHeight,
    containerIndex,
    displayTasks = [],
    simulatedSlotSpan = 1
}) => {
    return (        
        <div className="relative flex flex-col h-full w-full border-r border-r-gray-200" key={containerIndex}>            {
                displayTasks.map((task: ITask, index: number) => {
                    return (<DisplayTask 
                        hourPixel={containerHeight / 24} 
                        startTime={task.StartTime} 
                        endTime={task.EndTime} 
                        taskTitle={task.Title} 
                        taskDescription={task.Description}
                        slotIndex={index % simulatedSlotSpan} //mocking
                        slotCount={simulatedSlotSpan}
                        // slotIndex={0} //mocking
                        // slotCount={1}
                        />)
                })            
            }            
        </div>
    );
};

export default TaskDailyContainer;