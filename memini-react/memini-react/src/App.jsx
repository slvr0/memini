import React, { Component, useEffect } from "react";

import MeminiDateComponent from "./components/memini-date-component.jsx";
import MeminiDayPlanner from "./components/memini-day-planner.jsx";
import ModalSimple from "./components/modal-simple.jsx";

import { Container, Grid } from 'semantic-ui-react';


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

  render() { 
    
        return (
          <> 
          {/* <img src={logo} className="ui small image" alt="logo" />   */}
          

        
            <MeminiDayPlanner ></MeminiDayPlanner>
      
            
       

          {/* <div>
            <MeminiDateComponent></MeminiDateComponent>
          </div> */}

          
          

          </>
        );
    }
  }

export default App;








