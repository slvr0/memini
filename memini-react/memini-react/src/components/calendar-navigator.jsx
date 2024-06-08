import React, { Component } from "react";

import '../index.css';

class CalendarWeekRow extends Component{
    constructor(props){
        super(props);  
      
        this.state = {
          something: ""
        };
        
        this.weekDays = props.weekDays;
        
    }
    
    componentDidMount() {
      
    }

  render() { 

        return (
          <>
            
          </>
        );
    }
}

export default CalendarWeekRow;








