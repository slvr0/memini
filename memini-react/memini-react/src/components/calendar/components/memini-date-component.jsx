import React, { Component } from "react";

import Calendar  from "./calendar";
import CalendarNavigator from "./calendar-navigator";
import TodaysDate from "./todays-date";

import '../../../index.css';


class MeminiDateComponent extends Component{
    constructor(props){
        super(props);        

        this.dateNow    = new Date();
        this.yearNow    = this.dateNow.getFullYear();
        this.monthNow   = this.dateNow.getMonth() + 1;

        this.state = {
            selectedDate : {year: this.yearNow, month: this.monthNow}
          };
        
    }
    
    componentDidMount() {
      
    }

    onCalendarDateChange = (yearSelected, monthSelected) => {
        this.setState((prevState) => ({selectedDate: {year: yearSelected, month: monthSelected}})); 
    }

    onClickTodaysDate = () => {
        this.setState((prevState) => ({selectedDate: {year: this.yearNow, month: this.monthNow}})); 
    }

  render() { 

        return (
          <>
            
            <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">  
                        
            <div className="text-center">
                <TodaysDate onClickTodaysDate={this.onClickTodaysDate}></TodaysDate>
            </div>
            <br></br>
        


            <hr></hr> 
          

            <CalendarNavigator 
            selectedDate={this.state.selectedDate} 
            onInputChangeCallback={this.onCalendarDateChange}     
            />       

       
            <hr></hr>
            <br></br>

            <Calendar selectedDate = {this.state.selectedDate} ></Calendar>
            </div>              
            </div> 

          </>
        );
    }
}

export default MeminiDateComponent;








