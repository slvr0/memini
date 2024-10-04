import React, { Component, useEffect, Fragment } from "react";

import ScheduleGridManager from "./components/schedule-grid/components/schedule-grid-manager.jsx";

import ScheduleGridContextProvider from "./components/schedule-grid/store/schedule-grid-context-provider.jsx";

import MeminiDateComponent from "./components/calendar/components/memini-date-component.jsx";

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

<div className="ui visible inverted left vertical sidebar menu">
    <a className="item">
      <i className="home icon"></i>
      Home
    </a>
    <a className="item">
      <i className="gamepad icon"></i>
      Calendar
    </a>  
    <a className="item">
      <i className="settings icon"></i>
      Settings
    </a>
  </div>


  <div className="pusher">
    <div className="ui basic segment">
      <h3 className="ui header">Memini</h3>
        <div className="ui grid">
          <div className="ui row">
            <div className="eight wide column gridBlock">
              <MeminiDateComponent></MeminiDateComponent>
            </div>
            <div className="eight wide column">
              <ScheduleGridContextProvider> 
                <ScheduleGridManager />
              </ScheduleGridContextProvider>
            </div>
          </div>
          {/* <div className="ui row">
            <div className="eight wide column">
              
            </div>
            <div className="eight wide column">

            </div>
          </div> */}
        </div>

        
        
    </div>
  </div>



<img src={logo} className="ui small image" alt="logo" />   


      

           

      
      
      
      </>
    );
    }
  }

export default App;








