import React, { Fragment } from 'react';
import logo from "../../../assets/images/memini_logo_f4.png";

const MainMenuBarNew = (props) => {

    return(
        <>  
     
            <div className="two wide column">
                <img src={logo}  style={{ width: '35%', height: 'auto' }} />
            </div>   

            <div className="eight wide column main-menu-option-row">
                <span className="main-menu-option">Home</span>
                <span className="main-menu-option main-menu-selected-menu-option">Planning</span>
                <span className="main-menu-option">Events</span>
                <span className="main-menu-option">My profile</span>
                <span className="main-menu-option">About</span>
            </div>

            <div className="four wide right floated column main-menu-option-row-right">

                <button className="ui button mini main-menu-get-started-button">Get started</button>
                <button className="ui button mini basic">Login</button>
           
            </div>            




            
            </>
    )
}

export default MainMenuBarNew;