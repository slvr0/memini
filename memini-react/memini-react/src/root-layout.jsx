import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import MainMenuBar from './features/general/components/main-menu-bar';
import DateSelector from './features/planning/components/date-selector';
import CalendarMonthDisplay from './features/planning/components/calendar-month-display';

import ScheduleGrid from "./features/planning/components/schedule-grid";
// import DailyTaskTimeline from './features/planning/components/improved-task-scheduler-bar';

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
    {/* Top menu bar */}

    <div className="grid grid-rows-[4rem_1fr] h-screen w-screen overflow-hidden">
      <div className="border border-bg-gray-200">
        <MainMenuBar />
      </div >

      {/* Main content area */}
      <div className="border border-bg-gray-200">
        {/* Sidebar - Remove fixed width, let it grow */}
        <div className="h-screen fixed top-16 left-0 flex flex-col items-center z-9000 bg-white">
          <SideMenuPanel />
        </div>

        {/* Outlet content - Keep fixed margin so it doesn't move */}
        <div className="h-screen">     
            <Outlet />          
        </div>
      </div>
    </div>
  </ThemeProvider>
</>



  
  );
};

export default RootLayout;