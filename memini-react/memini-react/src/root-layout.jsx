import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import MainMenuBarNew from './components/main-menu-bar/components/main-menu-bar-new';

const RootLayout = () => {
  return (
    <div className="ui grid centered main-page-main-grid">
        <div className="ui row main-page-row gridBlock h-screen">
        <div className="one wide column"> {/* Left void */}</div>    

        <div className="twelve wide column main-page-content">
          <div className="ui grid">
              <div className="ui row main-menu-bar-container">                
                <MainMenuBarNew></MainMenuBarNew>                
              </div>
              <div className="ui row">      
                <Outlet />
              </div>               
          </div>
        </div>
        <div className="one wide column"> {/* Right void */}</div>

        </div>
        </div>
  );
};

export default RootLayout;