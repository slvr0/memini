import React, { createRef, Fragment } from "react";
import Task from "../../task/components/task.jsx";
import TaskNew from "../../task/components/task-new.jsx";

//more like a computational wrapper to a Task, controlling position size and connecting drag/drop events
const Block = (props) => {    
    if(!props.content){
        return (<>
            <button draggable className="ui button schedule-grid-menu-new-task"  onDragStart={(event) => props.onDrag(this)}                     
                        >New Task
            </button>       
        </>)
    }
    const blockRef = createRef(null); 

    const configureAttachedTaskBlock = (endTime, startTime) => {
        const hourPixel = 50;
        const height     = hourPixel * (endTime - startTime) / 60;
        const yPosition  = hourPixel * startTime / 60;  
        return {height: height, yPosition: yPosition, cssName: ` attached-task` }
    } 
        

    let {height, yPosition, cssName} = configureAttachedTaskBlock(props.content.EndTime, props.content.StartTime);
    
    console.log(height)

    //element sizing applies here
    const blockComputationStyling = {
        height: `${height}px`,    
        top:    `${yPosition}px`,
    }  
   
    return (
        <>  
            <div 
                draggable 
                ref={blockRef}
                className={`${cssName}`}
                style={blockComputationStyling}>
                    {props.content ? (
                        <TaskNew
                            content={props.content}  
                        >       
                        </TaskNew>           
                    ) : (
                    <Fragment>                
                        <button className="ui button schedule-grid-menu-new-task"                      
                        >New Task
                        </button>
                    </Fragment>
                    )}
            </div>
    
        </>       
    );
    
}

export default Block;








