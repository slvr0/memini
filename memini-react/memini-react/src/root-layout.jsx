import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import MainMenuBar from './features/general/components/main-menu-bar';
import DateSelector from './features/planning/components/date-selector';
import CalendarMonthDisplay from './features/planning/components/calendar-month-display';

import ScheduleGrid from "./features/planning/components/schedule-grid";
// import DailyTaskTimeline from './features/planning/components/improved-task-scheduler-bar';

import { useSelector } from 'react-redux';


import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


const RootLayout = () => {
  const userSession = useSelector((state) => state.meminiUser.userSession);

  return (  
    <>
     <InitColorSchemeScript attribute="class" />
      <ThemeProvider theme={theme}>
        <div className='flex flex-col'>
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12">
              {userSession && 
                <>
                   <MainMenuBar />
                </>
              }
              {!userSession && 
                <>
                  <MainMenuBar />
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
              {/* <ScheduleGrid /> */}
              {/* <DailyTaskTimeline /> */}
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
      </div>
    </ThemeProvider>
       
    

</>

  
  );
};

export default RootLayout;