import React, { Component, useEffect, Fragment } from "react";

import DayScheduleGrid from "./components/activity-grid-control/day-schedule-grid.jsx";

import logo from './assets/images/logo_2-removebg-preview.png';

import './App.css';
import './index.css'

import $ from "jquery";

import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min.js'; 

class App extends Component{
    constructor(props){
        super(props);  
        
        this.API_URL = "http://localhost:5000/";

        //this can be global context stuff
        this.dateNow = new Date();
        this.yearNow = this.dateNow.getFullYear();
        this.monthNow = this.dateNow.getMonth() + 1; // who programmed this to need  + 1 to be accurate.

        this.state = {
          isOpen:false,
          saved:false
        };
        
    }
    
  fetchData = async () => {
    fetch(this.API_URL + "api/Calendar/GetCalendar")
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json(); 
    })
    .then(data => {
      this.setState({note:data});
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }
  componentDidMount() {
 
  }

  //some function to connect dragged block

  render() { 
    
    

    return (
      <> 

<DayScheduleGrid />


      {/* <img src={logo} className="ui small image" alt="logo" />   */}         

      
     
            
     
 
    
        {/* <MeminiDayPlanner ></MeminiDayPlanner> */}
  
        
    

      {/* <div>
        <MeminiDateComponent></MeminiDateComponent>
      </div> */}

      
      

      </>
    );
    }
  }

export default App;








