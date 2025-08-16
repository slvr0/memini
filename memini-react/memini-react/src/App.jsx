import React, { Component, useEffect, Fragment, act, useState } from "react";

import MainMenuBarNew from "./components/main-menu-bar/components/main-menu-bar-new.jsx";

import logo from './assets/images/logo_2-removebg-preview.png';
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import './App.css';
import './index.css'
import $ from "jquery";

import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min.js'; 

import HomePage from "./components/home/homepage.jsx";
import PlanningPage from "./components/planning/components/planning-page.jsx";
import EventsPage from "./components/events/components/events-page.jsx";
import ProfilePage from "./components/user/components/profile-page.jsx";
import RootLayout from "./root-layout.jsx";
import SignupPage from "./components/user/components/signup-page.jsx";
import LoginPage from "./components/user/components/login-page.jsx";

function App() {
  const applicationTabs = {
    Home: 'home',
    Planning : 'planning',
    Events : 'events',
    User : 'user'
  }

  return (
      <>     
          <Routes>
          {/* Define the root layout */}
          <Route path="/" element={<RootLayout />}>
          {/* Define nested routes */}
          <Route path="/" element={<HomePage />}/>
          <Route path="home" element={<HomePage />} />
          <Route path="planning" element={<PlanningPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* Add more nested routes here */}
          </Route>
          </Routes>

      </>
    );
   
  }

export default App;








