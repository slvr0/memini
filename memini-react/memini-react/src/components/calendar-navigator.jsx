import React, { Component, createRef } from "react";

import '../index.css';

import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import { Grid, Ref, Segment } from "semantic-ui-react";

import { createPortal } from 'react-dom';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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

class CalendarNavigator extends Component{
  constructor(props){
    super(props); 

    this.state = {
      isOpen: false,
      isMonthSelectionHovered: false
    };

    this.monthSelectedValue = monthNames[this.props.selectedDate.month -1];
    this.yearSelectedValue  = this.props.selectedDate.year;

    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;
    
    this.yearOptions = [];
    for (let year = startYear; year <= endYear; year++) {
      this.yearOptions.push({ key: year, value: year, text: year });
    }

    this.monthOptions = [
      { key: 'jan', value: 'January', text: 'January' },
      { key: 'feb', value: 'February', text: 'February' },
      { key: 'mar', value: 'March', text: 'March' },
      { key: 'apr', value: 'April', text: 'April' },
      { key: 'may', value: 'May', text: 'May' },
      { key: 'jun', value: 'June', text: 'June' },
      { key: 'jul', value: 'July', text: 'July' },
      { key: 'aug', value: 'August', text: 'August' },
      { key: 'sep', value: 'September', text: 'September' },
      { key: 'oct', value: 'October', text: 'October' },
      { key: 'nov', value: 'November', text: 'November' },
      { key: 'dec', value: 'December', text: 'December' },
    ];  
    
      
  }
    
  //portalling this component
  componentDidMount() {
    const portalContainer = document.getElementById('calendar-navigator');
    if (portalContainer) {
      this.setState({ isOpen: true });
    }
  }

  chevronOnHoverStyle = () => {
    return "inline-block hover:text-red-500 transition-colors duration-100 cursor-pointer";
  } 

  onMonthChange = (e, { value }) => {
    this.monthSelectedValue = this.monthOptions.findIndex(month => month.value === value) + 1;
    this.props.onInputChangeCallback(this.yearSelectedValue, this.monthSelectedValue);

  }

  onYearChange = (e, { value }) => {
    this.yearSelectedValue = value;
    this.props.onInputChangeCallback(this.yearSelectedValue, this.monthSelectedValue);
  }

    //tailwind css and semantic components does not work together at all
  yearSelectionDropdownStyle = () => {
    return "compact rounded-dropdown mx-1 border-dashed";
  }

  monthSelectionDropdownStyle = () => {
    return "compact rounded-dropdown mx-1 border-dashed";
  }

  handleDropdownHover = () => {
    console.log("on hover");

    this.setState((prevState) => ({isMonthSelectionHovered: true})); 
   
  };
  
  handleDropdownLeave = () => {
    this.setState((prevState) => ({isMonthSelectionHovered: false})); 
  };

  

  render() { 

      const { isOpen } = this.state;

      if(!isOpen) {
        return (<></>);
      }     

      const portalContainer = document.getElementById('calendar-navigator');
      if (!portalContainer) {
        console.log("cannot portal calendar navigator element");
        return null; 
      }
      var chevronHoverStyling = this.chevronOnHoverStyle();      

      const monthIndex = this.props.selectedDate.month - 1;
      const selectedMonthName = this.monthOptions[monthIndex]?.value; 


      const yearDropdownStyling = this.yearSelectionDropdownStyle();
      const monthDropdownStyling = this.monthSelectionDropdownStyle();

      return createPortal(
        <>

            <h4 className="text-center">

            <Icon className={`chevron left icon ${chevronHoverStyling}`} size="large" style={{ marginRight: '1.25em' }} />
            
            <Dropdown
            placeholder='Select Month'
            selection
            options={this.monthOptions}
            onChange={this.onMonthChange}
            defaultValue={selectedMonthName}
            className={monthDropdownStyling}
            onMouseLeave={this.handleDropdownLeave}
            style={{ border: 'none', width:'100px' }}
            /> 
            <Dropdown
            placeholder='Select Year'
            selection
            options={this.yearOptions}
            onChange={this.onYearChange}
            defaultValue={this.props.selectedDate.year}
            className={yearDropdownStyling}
            style={{ border: 'none', width:'90px' }}
            />

            {" "}             
                        
            <Icon className={`chevron right icon ${chevronHoverStyling}`} size="large" style={{ marginLeft: '1.25em' }}/>


            </h4>


            {/* <Dropdown
              placeholder='Select Year'
              selection
              options={this.yearOptions}
              onChange={this.onYearChange}
              defaultValue={this.props.selectedDate.year}
              className={yearDropdownStyling}
              
            />
            <Dropdown
              placeholder='Select Month'
              selection
              options={this.monthOptions}
              onChange={this.onMonthChange}
              defaultValue={selectedMonthName}
              className='calendar-navigator-dropdown-month'
            />    */}
      
        </>, document.getElementById('calendar-navigator')
      );
    }
}

export default CalendarNavigator;








