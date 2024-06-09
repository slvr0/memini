import React, { Component } from "react";

import '../index.css';

import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import { Grid, Ref, Segment } from "semantic-ui-react";



class CalendarNavigator extends Component{
  constructor(props){
    super(props); 

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
    const  monthSelectedValue= this.monthOptions.findIndex(month => month.value === value) + 1;
    this.props.onInputChangeCallback(this.props.selectedDate.year, monthSelectedValue);
  }

  onYearChange = (e, { value }) => {   
    this.props.onInputChangeCallback(value, this.props.selectedDate.month);
  }

  //tailwind css and semantic components does not work together at all
  yearSelectionDropdownStyle = () => {
    return "compact rounded-dropdown mx-1 border-dashed";
  }

  monthSelectionDropdownStyle = () => {
    return "calendar-navigator-dropdown-month compact rounded-dropdown mx-1 border-dashed";
  }

  dropdownHoverStyle = () => {
    return "hover:bg-blue-100 hover:text-black hover:rounded-full cursor-pointer";
  }

  onChevronLeftTriggered = (e, { value }) => {  
    const monthIndex = this.props.selectedDate.month - 1;

    if(monthIndex < 1) {
      this.props.onInputChangeCallback(this.props.selectedDate.year - 1, 12);
    } 
    else {
      this.props.onInputChangeCallback(this.props.selectedDate.year, monthIndex);
    }
        
  }

  onChevronRightTriggered = (e, { value }) => {  
    const monthIndex = this.props.selectedDate.month + 1;

    if(monthIndex > 12) {
      this.props.onInputChangeCallback(this.props.selectedDate.year + 1, 1);
    }
    else {
      this.props.onInputChangeCallback(this.props.selectedDate.year, monthIndex);
    }        
  } 

  render() {    

      const chevronHoverStyling = this.chevronOnHoverStyle();     
      const yearDropdownStyling = this.yearSelectionDropdownStyle();
      const monthDropdownStyling = this.monthSelectionDropdownStyle();
      const dropdownHoverStyling = this.dropdownHoverStyle();
      console.log(dropdownHoverStyling);

      const monthIndex = this.props.selectedDate.month - 1;
      const selectedMonthName = this.monthOptions[monthIndex]?.value; 

      return (
        <>
            <h4 className="text-center">

            <Icon onClick={this.onChevronLeftTriggered} className={`chevron left icon ${chevronHoverStyling}`} size="large" style={{ marginRight: '1.25em' }} />
                  
            <Dropdown
              placeholder='Select Month'
              selection
              options={this.monthOptions}
              onChange={this.onMonthChange}
              value={selectedMonthName}
              className={monthDropdownStyling}
              onMouseLeave={this.handleDropdownLeave}
              style={{ border: 'none', width:'125px' }}
              direction='left'
            />
      
           
            <Dropdown
              placeholder='Select Year'
              selection
              options={this.yearOptions}
              onChange={this.onYearChange}
              value={this.props.selectedDate.year}
              className={yearDropdownStyling}
              style={{ border: 'none', width:'90px' }}
            />

            {" "}             
                        
            <Icon onClick={this.onChevronRightTriggered} className={`chevron right icon ${chevronHoverStyling}`} size="large" style={{ marginLeft: '1.25em' }}/>

            </h4>
      
        </>
      );
    }
}

export default CalendarNavigator;








