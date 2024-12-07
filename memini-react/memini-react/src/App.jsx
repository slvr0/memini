import React, { Component, useEffect, Fragment, act } from "react";
import ScheduleGridManager from "./components/schedule-grid/components/schedule-grid-manager.jsx";
import ScheduleGridContextProvider from "./components/schedule-grid/store/schedule-grid-context-provider.jsx";
import CalendarContainer from "./components/calendar/components/calendar-container.jsx";
import MainMenuBarNew from "./components/main-menu-bar/components/main-menu-bar-new.jsx";
import UserMainPage from "./components/user/components/user-main-page.jsx"
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

      this.applicationTabs = {
        Planning : 'planning',
        Events : 'events',
        User : 'user'
      }

      this.state = {
        activeTab : this.applicationTabs.Planning
      };    
      
      //this.fetchData();

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
      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  //can we do this one time instead of reloading the we F5 the mainpage...
  fetchCurrentUser = () => {
    //figure out how to get credentials
    const endpointURL = this.API_URL + "api/User/GetCurrentUser";
    


    
  }


  componentDidMount() {
 
  }

  onChangeTab = (activeTab) => {
    if(this.state.activeTab === activeTab)
      return;

    this.setState({ activeTab });   
  } 

  render() { 
    return (
      <> 

        <div className="ui grid centered main-page-main-grid">
        <div className="ui row main-page-row gridBlock h-screen">
        <div className="one wide column"> {/* Left void */}</div>    

        <div className="twelve wide column main-page-content">
          <div className="ui grid">
              <div className="ui row main-menu-bar-container">                
                <MainMenuBarNew></MainMenuBarNew>                
              </div>
     
              <div className="ui divider main-menu-divider"></div>

              <div className="ui row">
             

              {this.state.activeTab === this.applicationTabs.Planning &&            
              <>
              <div className="four wide column content-container">
                    <CalendarContainer /> 
              </div>

              <div className="four wide column content-container">
                  
              </div>

              <div className="eight wide column content-container">
              <ScheduleGridContextProvider> 
                  <ScheduleGridManager />
              </ScheduleGridContextProvider>
              </div>
              </>
            }

            {this.state.activeTab === this.applicationTabs.Events &&
              <h3>Not implemented yet, To be continued !</h3>
            }

            {this.state.activeTab === this.applicationTabs.User &&
              <UserMainPage> </UserMainPage>
            }

              </div>



          

               
          </div>
        </div>
        <div className="one wide column"> {/* Right void */}</div>

        </div>
        </div>

      </>
    );
    }
  }

export default App;








