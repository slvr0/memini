import logo from './assets/images/logo_2-removebg-preview.png';
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import './App.css';
import './index.css'

import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.min.js'; 

import HomePage from "./features/homepage/components/homepage";
import PlanningPage from "./features/planning/components/planning-page";
import EventsPage from "./features/events/components/events-page";
import ProfilePage from "./features/user/components/profile-page";
import RootLayout from "./root-layout.jsx";
import SignupPage from "./features/user/components/signup-page";
import LoginPage from "./features/user/components/login-page";

function App() {
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








