import React, { Component } from "react";

import '../index.css';
import {generateHalfHourIntervals} from "../computations/date-computations.js"
import {Divider,Container, Grid} from "semantic-ui-react";



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
        const name = this.props.name; //this is right now just a schedule hash
        const duration = this.props.duration;  
        const blockId = this.props.blockId;      

        return (
          <>

          <button  
            key={blockId}          
            draggable
            onDragStart={(event) => this.onDragStart(event, name)}
            className="draggable-item ui button default"
            >
            {name}
            </button>
          </>
        );
    }
}

export default ScheduleBlock;








