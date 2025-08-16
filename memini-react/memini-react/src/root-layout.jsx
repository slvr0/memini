import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import MainMenuBarNew from './components/main-menu-bar/components/main-menu-bar-new';
import DateSelector from './components/calendar/components/date-selector';
import ScheduleGridManager from "../src/components/schedule-grid/components/schedule-grid-manager";
import CalendarMonthDisplay from './components/calendar/components/calendar-month-display';
import ConsoleViewer from './components/general-components/components/console-display.jsx';
import { useSelector } from 'react-redux';

const RootLayout = () => {
  const userSession = useSelector((state) => state.meminiUser.userSession);

  return (    
<div className="grid grid-cols-12 gap-0">
  <div className="col-span-12 flex items-stretch bg-[#14181B]">
      {userSession && 
        <>
          <div className="flex-[0_0_66.6667%]">
          <MainMenuBarNew />
          </div>
          <div className="flex-[0_0_33.3333%] flex items-center justify-end">
          <DateSelector />
          </div>
        </>
      }

      {!userSession && 
        <>
          <div className="flex-[0_0_100%]">
          <MainMenuBarNew />
          </div>
        </>
      }
  </div>
  
  {userSession && 
    <>
      <div className="col-span-9">
      <Outlet />
      </div>

      <div className="col-span-3">
      <CalendarMonthDisplay />
      <ScheduleGridManager />
      </div>
    </>
  }

  {
    !userSession && 
      <div className="col-span-12">
      <Outlet />
    </div>
  }
  
</div>

  
  );
};

export default RootLayout;