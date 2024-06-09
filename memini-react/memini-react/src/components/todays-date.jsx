import React, { Component, createRef } from "react";

import '../index.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import { Grid, Ref, Segment } from "semantic-ui-react";

const MonthsEnum = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
class TodaysDate extends Component{
  constructor(props){
    super(props); 

    this.dateNow = new Date();
    this.yearNow = this.dateNow.getFullYear();
    this.monthNow = this.dateNow.getMonth() + 1;
    this.dayNow =  this.dateNow.getDate();
      
  }    
  componentDidMount() {
    
  }

  calendarDateHoverStyle = () => {
    return "hover:bg-blue-100 hover:text-black hover:rounded-full cursor-pointer";
  }

  render() {     
    
    const hoverStyle = this.calendarDateHoverStyle();
      return (
        <>
            <button onClick={this.props.onClickTodaysDate} className="ui button todaysDateButton ">
                <h2 className="text-lg font-semibold text-gray-700"> 
                {this.dateNow.toLocaleDateString('en-US', { weekday: 'long' })}, { MonthsEnum[this.monthNow] } {this.dayNow} {this.yearNow}
                </h2>
            </button>                          
        </>
      );
    }
}

export default TodaysDate;








