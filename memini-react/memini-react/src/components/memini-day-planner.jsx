import React, { Component, Fragment, act } from "react";

import '../index.css';
import {generateHalfHourIntervals} from "../computations/date-computations.js"
import {
    Divider,Container, Grid
} from "semantic-ui-react";

import Block from "./block.jsx";
import HorizontalScheduleMarker from "./horizontal-schedule-marker.jsx"
import ActivityPickerModal from "./activity-picker-modal.jsx";

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

        this.dropZoneContainer = React.createRef(null);
        this.dropAreaRef = React.createRef();

        
    }

    onDragStart = (event, item) => {    
        
      
        //event.dataTransfer.setData('item', JSON.stringify(item));  

        this.selectedItem = item;

        this.horizontalScheduleMarker.setRenderMode(true);
    };    

    onDrop = (event) => {  
        event.preventDefault();

        if (this.horizontalScheduleMarker) {
            this.horizontalScheduleMarker.setRenderMode(false);
        }

        try {
            this.sendModalOpenEvent();
        } catch (error) {
            console.error('Error parsing JSON:', error);        
        }

        this.sendModalOpenEvent();        
    };

    onDragOver = (event) => {
        event.preventDefault();

        //if position y with some discretization has occured trigger callback in child horizontal schedule marker

        const container = this.dropZoneContainer.current;
        const containerRect = container.getBoundingClientRect();
        const mouseY = event.clientY;    
        
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
        this.updateDropAreaHeight();        
        window.addEventListener('resize', this.updateDropAreaHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDropAreaHeight);
    }

    componentDidUpdate() {
        this.updateDropAreaHeight();
    }

      updateDropAreaHeight() {

        
        if (this.dropAreaRef && this.dropAreaRef.current) {
            console.log(this.dropAreaRef);
            const height = this.dropAreaRef.current.clientHeight;
            if (height !== this.dropAreaHeight) {
                this.dropAreaHeight = height;
          }
        }
      }

    handleSubmitActivityPicker = (startTime, endTime, title, description) => { 
        
        this.addActivity({start: startTime, end: endTime, title: title, description: description, duration: this.selectedItem.duration});        
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

        const newActivity = {...activity, 
            id:this.activitiesAdded,
            startTimeFraction: startTimeFraction,
            endTimeFraction: endTimeFraction,
            type:"activityBlock",  
            duration: activity.duration      
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

        console.log(hhFrac, mmFrac);
        return (hhFrac * 60) + (mmFrac);
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
            { id: 1, name: '1 Hour Activity',   type:"activityOption"     , duration : 1   } ,
            { id: 2, name: '2 Hour Activity',   type:"activityOption"     , duration : 2   },
            { id: 3, name: '3 Hour Activity',   type:"activityOption"     , duration : 3   }
        ];

        return (
            <>
                <ActivityPickerModal onSubmit={this.handleSubmitActivityPicker}></ActivityPickerModal>                
                
                <span className="h-32 items">
                    {activeScheduleBlocks.map((item, index) => (
                        <Fragment key={index} >
                            <button draggable className="ui button default" onDragStart={(event) => this.onDragStart(event, item)}> {item.name} </button>
                        </Fragment>
                    ))}
                </span>

                <div className={`h-screen flex-row inline-flex schedule-drop-area`} 
                    ref={this.dropAreaRef}
                >                    

                    <HorizontalScheduleMarker 
                        ref={(horizontalScheduleMarker) => { this.horizontalScheduleMarker = horizontalScheduleMarker; }} >
                    </HorizontalScheduleMarker>

                    <span className={`bg-gray-300 box-border p-4 border-2 w-32 rounded-lg shadow-lg`}>
                                               
                    </span>

                    <span className={`bg-gray-300 box-border p-4 border-2 w-64 rounded-lg shadow-lg justify-items-center`}                        
                        onDrop={this.onDrop}
                        onDragOver={this.onDragOver}
                        onDragLeave={this.onDragLeave}
                        ref={this.dropZoneContainer}
                        style={{ position: 'relative' }}
                    >

                        {this.state.activities.map((item, index) =>   {
                            const blockStartPosition = item.startTimeFraction * 0.00069444444444  * this.dropAreaHeight;
                            const blockHeight = (item.endTimeFraction - item.startTimeFraction) / this.minutesInDay * this.dropAreaHeight;
                            
                            
                            console.log(this.dropAreaHeight);
                            console.log(blockStartPosition);
                            const heightDuration = this.dropAreaHeight *  item.duration * 0.0416666666666667;

                            console.log(this.dropAreaHeight);                            
                            console.log(item.duration);
                            console.log(heightDuration);
                            
                            return (
                                <div className=""
                                style={{ position: 'absolute', top: blockStartPosition }} 
                                key={index}> 
                                    <Block  
                                        height={heightDuration}
                                        width={"w-64"}
                                        content={null}                                        
                                    >                                               
                                    </Block>
                                </div>
                            );
                        })}

                    </span>
                </div>
                
            </>
        );
    }
}

export default MeminiDayPlanner;








