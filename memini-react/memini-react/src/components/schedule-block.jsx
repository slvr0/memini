import React, { Component } from "react";

import '../index.css';
import {generateHalfHourIntervals} from "../computations/date-computations.js"
import {Divider,Container, Grid} from "semantic-ui-react";
import ActivityBlock from "./activity-block.jsx";
class ScheduleBlock extends Component{
    constructor(props){
        super(props);       


        this.state = {
            something : ""
          };

        //assign like a unique hash to search  these ?
        
    }
    
    componentDidMount() {
      
    }

    onDragStart = (event, scheduleHash) => {
        event.dataTransfer.setData('item', JSON.stringify(scheduleHash));
    };
    
  render() { 
        const title = this.props.title; //this is right now just a schedule hash
        
        const description = this.props.description;  
        const blockId = this.props.blockId; 
        const startPosition = this.props.startPosition;
        const height = this.props.height;
        const startTime = this.props.startTime;
        const endTime = this.props.endTime;
        
        console.log(this.props.type);
        return (
          <>

          {/* this is sort of stupid but for now works only activityBlock will calculate startPosition and height*/}

          {this.props.type === "activityBlock" &&
            <button  
              key={blockId}          
              draggable
              onDragStart={(event) => this.onDragStart(event, title)}
              className="draggable-item"
              style={{
                position: 'absolute',
                top: `${startPosition}px`,
                height: `${height}px`               
              }}
              >
              <ActivityBlock 
                title={title} 
                description={description} 
                startTime={startTime} 
                endTime={endTime}
                height={height}
              >

              </ActivityBlock>

              </button>
          }

          {this.props.type === "activityOption" &&
            <button  
              key={blockId}          
              draggable
              onDragStart={(event) => this.onDragStart(event, title)}
              className="draggable-item ui button default"
              >
              {title}
              </button>
          }


          </>
        );
    }
}

export default ScheduleBlock;








