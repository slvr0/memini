import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import MainMenuBar from './features/homepage/components/main-menu-bar';
import LoginPage from './features/user/components/login-page';
import { useSelector } from 'react-redux';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import SideMenuPanel from './features/homepage/components/side-menu-panel';

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
              <div className="ml-16 ">     
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