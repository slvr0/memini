import React, { Component } from "react";

import Calendar  from "./calendar";
import CalendarNavigator from "./calendar-navigator";
import TodaysDate from "./todays-date";

import '../index.css';


class MeminiDateComponent extends Component{
    constructor(props){
        super(props);  
      
        this.state = {
          something: ""
        };
        
    }
    
    componentDidMount() {
      
    }

  render() { 

        return (
          <>
            
            <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">  
            
           
            
            <div className="text-center">
                <TodaysDate></TodaysDate>
            </div>

            <br></br>    


            <hr></hr> 
            <br></br>

            <div id="calendar-navigator">              
            </div>        

            <br></br>
            <hr></hr>
            <br></br>

            <Calendar></Calendar>
            </div>              
            </div> 

          </>
        );
    }
}

export default MeminiDateComponent;








