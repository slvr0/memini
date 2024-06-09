import React, { Component } from "react";

import '../index.css';



class CalendarWeekRow extends Component{
    constructor(props){
        super(props);  
      
        this.state = {
          something: ""
        };
        
        this.weekDays = props.weekDays;
        
        //add ghostdays list for days outside of month boundary

        this.isCurrentWeek = false; //highlighted if true
        
    }
    
    componentDidMount() {
      
    }

  render() { 

        return (
          <>
              <div className="grid grid-cols-7 gap-4 p-4">
                {this.weekDays.map((day, key) => (
                    <div className="bg-white bg-opacity-30 rounded-lg shadow-lg p-4 flex justify-center items-center w-20 h-20">
                        <span key={key} className="text-gray-800 text-2xl font-semibold">{day}</span>
                    </div>
                ))}
    </div>


            {this.weekDays.map((day, dayKey) => {
                return ;
            })}
            
          </>
        );
    }
}

export default CalendarWeekRow;








