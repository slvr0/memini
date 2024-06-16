import React, { Component, Fragment, act } from "react";

import '../index.css';
import {generateHalfHourIntervals} from "../computations/date-computations.js"
import {
    Divider,Container, Grid
} from "semantic-ui-react";

import ScheduleBlock from "./schedule-block.jsx";
import HorizontalScheduleMarker from "./horizontal-schedule-marker.jsx"
import ActivityPickerModal from "./activity-picker-modal.jsx";
import ModalSimple from "./modal-simple.jsx";

class MeminiDayPlanner extends Component{
    constructor(props){
        super(props);      

        this.state = {
            activities: [],
            modalIsOpen: false
          };

        this.intervals = generateHalfHourIntervals(0, 23);   
        
        this.activitiesAdded = 0;
        this.minutesInDay = 24 * 60;
    }

    onDragStart = (event, item) => {
        event.dataTransfer.setData('item', JSON.stringify(item));

        this.horizontalScheduleMarker.setRenderMode(true);
    };    

    onDrop = (event) => {
        const item = JSON.parse(event.dataTransfer.getData('item'));

        if (this.horizontalScheduleMarker) {
            this.horizontalScheduleMarker.setRenderMode(false);
        }

        this.sendModalOpenEvent();
        
    };

    onDragOver = (event) => {
        event.preventDefault();

        //if position y with some discretization has occured trigger callback in child horizontal schedule marker

        const container = event.currentTarget;
        const containerRect = container.getBoundingClientRect();
        const mouseY = event.clientY - containerRect.top;
        
        
        this.horizontalScheduleMarker.updatePosition(mouseY);
        this.horizontalScheduleMarker.setRenderMode(true);

    };

    onDragLeave = (event) => {
        event.preventDefault();

        this.horizontalScheduleMarker.setRenderMode(false);
    }

    onPositionChange(newPosition) {
        return newPosition;
    }
    
    componentDidMount() {
      
    }

    handleSubmitActivityPicker = (startTime, endTime, title, description) => {        
        this.addActivity({start: startTime, end: endTime, title: title, description: description});        
    }

    sendModalOpenEvent = () => {
        const modalEvent = new Event('openModal');    
        window.dispatchEvent(modalEvent);
    }

    organizeActivites = () => {

    }

    // we can be smart when updating the activity matrix to directly sort the new object to re-render more effectively
    // but lets do that later :D 
    
    //id ? 
    addActivity = (activity) => {        
       
        this.activitiesAdded += 1;

        const startTimeFraction = this.timeAsFraction(activity.start);
        const endTimeFraction = this.timeAsFraction(activity.end);

        console.log(activity);

        const newActivity = {...activity, 
            id:this.activitiesAdded,
            startTimeFraction: startTimeFraction,
            endTimeFraction: endTimeFraction,
            type:"activityBlock"        
        };       

        this.setState(prevState => {
            const newActivities = [...prevState.activities, newActivity];   

            newActivities.sort((a, b) => a.startTimeFraction - b.startTimeFraction);

            //split into row matrices if colliding activities x0_start <= x1_interval <= x0_end

            
            return { activities: newActivities };
        });
    }

    //time = hh:mm
    timeAsFraction = (time) => {
        const hhFrac = parseInt(time.slice(0, 2));
        const mmFrac = parseInt(time.slice(3));
        return hhFrac * 60 + (mmFrac);
    }

    splitOverlappingActivities = (activities) => {
        const nonOverlappingIntervals = [];
        const overlappingIntervals = [];

        let lastEndTime = -1;

        for (const activity of activities) {
            if (activity.startTimeFraction >= lastEndTime) {
                // No overlap
                nonOverlappingIntervals.push(activity);
                lastEndTime = activity.endTimeFraction;
            } else {
                // Overlap detected
                overlappingIntervals.push(activity);
            }
        }

        return {nonOverlappingIntervals, overlappingIntervals}
    }
    
    // make like three buttons, sunrise, daysun and moon to quickly toggle different time zone of the day
    render() { 
        const activeScheduleBlocks = [ 
            { id: 1, name: 'Item 1', type:"activityOption" },
            { id: 2, name: 'Item 2', type:"activityOption" },
            { id: 3, name: 'Item 3', type:"activityOption" }
        ];

        return (
            <>
                <ActivityPickerModal onSubmit={this.handleSubmitActivityPicker}></ActivityPickerModal>

                {/* Here are the schedule block to drag to add to the day planner */}
                <div className="items">
                    {activeScheduleBlocks.map((item, index) => (
                        <Fragment key={index}>
                            <ScheduleBlock title={item.name} type={item.type}></ScheduleBlock >
                        </Fragment>
                    ))}
                </div>           

                {/* Marks the area where the schedule blocks are populated*/}
                <div className="flex justify-center items-center">
                    <div 
                        className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 drop-area"
                        onDrop={this.onDrop}
                        onDragOver={this.onDragOver}
                        onDragLeave={this.onDragLeave}
                        style={{ position: 'relative', height: '700px', width: '100%' }} 
                        >                              

                            <HorizontalScheduleMarker 
                                ref={(horizontalScheduleMarker) => { this.horizontalScheduleMarker = horizontalScheduleMarker; }} >
                            </HorizontalScheduleMarker>
                            
                            {/* <h2>Drop items here</h2> */}
                            {this.state.activities.map((item, index) =>   {
                                const blockStartPosition = (item.startTimeFraction / this.minutesInDay) * 700 ; 
                                const blockHeight = (item.endTimeFraction - item.startTimeFraction) / this.minutesInDay * 700;                            

                                
                                console.log(blockStartPosition);
                                console.log(blockHeight);

                                return (
                                    <div className="" key={index}
                                    
                                        
                                        > 
                                        <ScheduleBlock 
                                            title={item.title} 
                                            description={item.description}
                                            blockId={item.id}  
                                            startPosition={blockStartPosition}
                                            height={blockHeight}
                                            type={item.type}
                                        ></ScheduleBlock>
                                    </div>
                                );
                            })}
                    </div>           
                </div>
            </>
        );
    }
}

export default MeminiDayPlanner;








