import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import MainMenuBarNew from './features/general/components/main-menu-bar-new';
import DateSelector from './features/planning/components/date-selector';
import CalendarMonthDisplay from './features/planning/components/calendar-month-display';
import ConsoleViewer from './features/general/components/console-display.jsx';
import ScheduleGrid from "./features/planning/components/schedule-grid";
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
      <ScheduleGrid />
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