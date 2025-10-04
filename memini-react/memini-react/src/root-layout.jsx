import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import MainMenuBar from './features/general/components/main-menu-bar';
import DateSelector from './features/planning/components/date-selector';
import CalendarMonthDisplay from './features/planning/components/calendar-month-display';
import LoginPage from './features/user/components/login-page';

import { useSelector } from 'react-redux';

import { Typography, Box } from "@mui/material";

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText } from "lucide-react";
import LucidIconButton from "./lucid/lucid-button-icon"
import SideMenuPanel from './features/general/components/side-menu-panel';

const RootLayout = () => {
  const userSession = useSelector((state) => state.meminiUser.userSession);

  return (  
    <>
      <InitColorSchemeScript attribute="class" />
      <ThemeProvider theme={theme}>
        {userSession &&    
          <div className="grid grid-rows-[4rem_1fr] h-screen w-screen overflow-hidden">
            <div className="border border-bg-gray-200">
              <MainMenuBar />
            </div >

            {/* Main content area */}
            <div className="border border-bg-gray-200">
              {/* Sidebar - Remove fixed width, let it grow */}
              <div className="fixed top-16 h-[calc(100vh-4rem)] left-0 flex flex-col items-center z-[9999] transition-all bg-white">
                <SideMenuPanel />
              </div>

              {/* Outlet content - Keep fixed margin so it doesn't move */}
              <div className="ml-16 h-screen">     
                  <Outlet />          
              </div>
            </div>
          </div>
        }

        {!userSession &&    
          <LoginPage></LoginPage>
        }

      </ThemeProvider>
    </>



  
  );
};

export default RootLayout;