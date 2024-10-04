import React, { Component } from "react";
import { TaskContext } from "../store/task-context";
import "../css/task.css";
import "../computations/time-display-formatting"
import { convertMinuteTimeToHourMinutes, calculateTaskTime, convertHourMinutesToDisplayTime, timeMinutesAsString } from "../computations/time-display-formatting.js";
import { Grid, Icon } from "semantic-ui-react";

class DisplayTaskMicro extends Component{
    static contextType = TaskContext;
    constructor(props){
        super(props); 
        this.state = {
            
        }        
    } 

    componentDidMount() {
      
    }

    render() { 
        const params = this.props.params;

        const taskDuration = calculateTaskTime(params.content.startTime, params.content.endTime);
        const taskDurationAsString = convertHourMinutesToDisplayTime(taskDuration,  true, false);
        const startTimeHHMM = convertMinuteTimeToHourMinutes(params.content.startTime);
        const endTimeHHMM = convertMinuteTimeToHourMinutes(params.content.endTime);   
        
        const title = params.content.title;
        const description = params.content.description;

        const blockHeight = params.height;

        const titleHeightStyle = `${blockHeight / 3}px`;
        const descriptionHeightStyle = `${blockHeight / 1.5}px`;

        return (
        <>
            <div className="display-activity-micro-container">
                <div className="display-activity-time-display">
                    <div>
                        <b style={{ opacity: 0.9, marginLeft: '5px', color:'cornflowerblue' }}>{taskDuration.hours} </b>
                    </div>

                    <div>
                        <b style={{ opacity: 0.7, marginLeft: '2px' }}>Hr</b>
                    </div>   
                </div>
                
                <div style={{ width: '80%' }}>
                    <div className="display-task-micro-title text-xs display-activity-micro-title" style={{height: titleHeightStyle}}>
                    <b style={{ opacity: 0.9 }}>{title}</b> 
                    <hr></hr>
                    </div>
                    <div className="display-task-micro-description display-activity-micro-description" style={{height: descriptionHeightStyle}}>
                    <b style={{ opacity: 0.75 }}> <i> {startTimeHHMM.hours}:{timeMinutesAsString(startTimeHHMM.minutes)} - {endTimeHHMM.hours}:{timeMinutesAsString(endTimeHHMM.minutes)}</i> - </b>  <i>{description}</i>
                    </div>
                </div>

                <div className="display-activity-options-display">
                    <ul>
                        <li>
                        <Icon 
                        name="edit outline" 
                        size="tiny" 
                        style={{ 
                            fontSize: '0.6rem', 
                            padding: 0, 
                            border: 'none', // Remove any borders
                            outline: 'none', // Remove any outlines
                        }} 
                        />
                        </li>
                        <li>
                        <Icon 
                        name="trash alternate outline" 
                        size="tiny" 
                        style={{ 
                            fontSize: '0.6rem', 
                            padding: 0, 
                            border: 'none', // Remove any borders
                            outline: 'none', // Remove any outlines
                        }} 
                        />
                        </li>
                    </ul>  
                </div>
             

            </div>
        
        </>       
        );
    }
}

export default DisplayTaskMicro;








