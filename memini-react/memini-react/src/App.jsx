import React, { Component, useEffect, Fragment, act, useState } from "react";

import MainMenuBarNew from "./components/main-menu-bar/components/main-menu-bar-new.jsx";
import UserMainPage from "./components/user/components/user-main-page.jsx"
import logo from './assets/images/logo_2-removebg-preview.png';
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import './App.css';
import './index.css'
import $ from "jquery";

import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min.js'; 

import HomePage from "./components/home/homepage.jsx";
import PlanningPage from "./components/planning-page.jsx";
import EventsPage from "./components/events-page.jsx";
import ProfilePage from "./components/profile-page.jsx";
import RootLayout from "./root-layout.jsx";

function App() {

  async function fetchData () {
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
  function fetchCurrentUser() {
    //figure out how to get credentials
    const endpointURL = this.API_URL + "api/User/GetCurrentUser";
    
  }
  function onChangeTab (activeTab) {
    
  }
  
  const API_URL = "http://localhost:5000/";
  
  const applicationTabs = {
    Home: 'home',
    Planning : 'planning',
    Events : 'events',
    User : 'user'
  }

  const [activeTab, setActiveTab] = useState(applicationTabs.Home);
  console.log("restarting the app");
  //this.fetchData();

  return (
      <>     
          <Routes>
          {/* Define the root layout */}
          <Route path="/" element={<RootLayout />}>
          {/* Define nested routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="planning" element={<PlanningPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* Add more nested routes here */}
          </Route>
          </Routes>

      </>
    );
   
  }

export default App;








