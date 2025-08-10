import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import MainMenuBarNew from './components/main-menu-bar/components/main-menu-bar-new';
import DateSelector from './components/calendar/components/date-selector';
import CalendarContainer from "../src/components/calendar/components/calendar-container";
import ScheduleGridManager from "../src/components/schedule-grid/components/schedule-grid-manager";

const RootLayout = () => {
  return (    
<div className="grid grid-cols-12 gap-0">
  <div className="col-span-12 flex items-stretch bg-[#14181B]">
    <div className="flex-[0_0_66.6667%]">
      <MainMenuBarNew />
    </div>
    <div className="flex-[0_0_33.3333%] flex items-center justify-end">
      <DateSelector />
    </div>
  </div>

  <div className="col-span-9">
    <Outlet />
  </div>

  <div className="col-span-3">
    <CalendarContainer></CalendarContainer> 
     <ScheduleGridManager />
  </div>
</div>

  
  );
};

export default RootLayout;