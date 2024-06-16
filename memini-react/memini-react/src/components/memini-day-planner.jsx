import React, { Component } from "react";

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
    }

    onDragStart = (event, item) => {
        event.dataTransfer.setData('item', JSON.stringify(item));

        this.horizontalScheduleMarker.setRenderMode(true);
    };

    // we can be smart when updating the activity matrix to directly sort the new object to re-render more effectively
    // but lets do that later :D 
    addActivity = (activityFields) => { 
       
        debugger;
        
        const newActivity = {name: "abc"}



        this.setState(prevState => {
            const newActivities = [...prevState.activities, newActivity];
            return { activities: newActivities };
        });
    }

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
    
    handleSubmitActivityPicker = (activityFields) => {        
        this.addActivity(activityFields);        
    }

    sendModalOpenEvent = () => {
        const modalEvent = new Event('openModal');    
        window.dispatchEvent(modalEvent);
      }
    
    // make like three buttons, sunrise, daysun and moon to quickly toggle different time zone of the day
    render() { 
        const activeScheduleBlocks = [ 
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' }
        ];
        return (
            <>
                <ActivityPickerModal onSubmit={() => this.handleSubmitActivityPicker}></ActivityPickerModal>

                {/* Here are the schedule block to drag to add to the day planner */}
                <div className="items">
                    {activeScheduleBlocks.map(item => (
                        <ScheduleBlock name={item.name} blockId={item.id} ></ScheduleBlock>
                    ))}
                </div>           

                {/* Marks the area where the schedule blocks are populated*/}
                <div className="flex justify-center items-center">
                    <div 
                        className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 drop-area"
                        onDrop={this.onDrop}
                        onDragOver={this.onDragOver}
                        onDragLeave={this.onDragLeave} >                              

                            <HorizontalScheduleMarker ref={(horizontalScheduleMarker) => { this.horizontalScheduleMarker = horizontalScheduleMarker; }} >

                            </HorizontalScheduleMarker>
                        
                            {/* <h2>Drop items here</h2> */}
                            {this.state.activities.map(item => (
                            
                                <ScheduleBlock name={item.name} key={item.id}></ScheduleBlock>
                            ))}
                    </div>           
                </div>
            </>
        );
    }
}

export default MeminiDayPlanner;








