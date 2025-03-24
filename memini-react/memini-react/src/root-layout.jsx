import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import MainMenuBarNew from './components/main-menu-bar/components/main-menu-bar-new';

const RootLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
    {/* Left Void */}
    <div className="col-span-1"></div>
  
    {/* Main Content */}
    <div className="col-span-10 flex flex-col">
      {/* Menu Bar */}
      <div className="w-full memini-main-container">
        <MainMenuBarNew />
      </div>
  
      {/* Page Content */}
      <div className="flex-1 w-full memini-main-container">
        <Outlet />
      </div>
    </div>
  
    {/* Right Void */}
    <div className="col-span-1"></div>
  </div>
  
  );
};

export default RootLayout;