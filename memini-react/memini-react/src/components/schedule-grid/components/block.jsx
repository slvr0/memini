import React, { createRef, Fragment } from "react";
import Task from "../../task/components/task.jsx";

//more like a computational wrapper to a Task, controlling position size and connecting drag/drop events
const Block = (props) => {
    const blockRef = createRef(null);
    
    //goes to some computation js
    const taskTypeBackgroundColors = {
        'sport' : ' display-activity-background-sport',
        'chore' : ' display-activity-background-chore',
        'fun'   : ' display-activity-background-fun'
    };

    //constant variables
    const width      = props.staticWidth ?? 200;    

    const configureAttachedTaskBlock = (endTime, startTime) => {
        const hourPixel = 50;
        const height     = hourPixel * (endTime - startTime) / 60;
        const yPosition  = hourPixel * startTime / 60;  
        return {height: height, yPosition: yPosition, cssName: ` attached-task` }
    }
    //block decoration depends on tasktype
    const peekTaskTypeBackground = (contentType) => {       
        return taskTypeBackgroundColors[contentType];
    }

    let height = props.staticHeight, yPosition = 0, cssName = '';
    if (props.content.attached === true) {
        ({ height, yPosition, cssName } = configureAttachedTaskBlock(props.content.endTime, props.content.startTime));
    }

    const style = {
        height: `${height}px`,        
        width:  `${width}px`,
        top:    `${yPosition}px`,
    }  
    
    const cssBackgroundColorForTaskType = props.applyActivityTypeBackground ? peekTaskTypeBackground(props.content.type) : '';   
   
    return (
        <>  
            <div 
                draggable 
                ref={blockRef}
                className={`${cssName}`}
                onDragStart={(event) => props.onDrag(this)}
                style={style}>
                    {props.content ? (
                        <Task                                 
                            height={height}
                            content={props.content}  
                        >
                        </Task>           
                    ) : (
                    <Fragment>                
                        <p>No content available</p>
                    </Fragment>
                    )}
            </div>
    
        </>       
    );
    
}

export default Block;








