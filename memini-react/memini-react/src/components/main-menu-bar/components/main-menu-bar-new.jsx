import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/images/memini_logo_f4.png";
import { MenuMenu, MenuItem, Menu, Segment } from 'semantic-ui-react'

const MainMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    

    const pathToMenuMap = {
        "/home": "Home",
        "/planning": "Planning",
        "/events": "Events",
        "/profile": "My profile",
      };


      const selectedMenu = pathToMenuMap[location.pathname] || "Home";

      const handleMenuClick = (path, name) => {
        navigate(path);
      };  


  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    const { activeItem } = 'home';

    return (
      <>
        <Menu pointing secondary>
          <MenuItem
            name='Home'
            active={selectedMenu === 'Home'}
            onClick={() => handleMenuClick("/home")}
          />
          <MenuItem
            name='Planning'
            active={selectedMenu === 'Planning'}
            onClick={() => handleMenuClick("/planning")}
          />
          <MenuItem
            name='Events'
            active={selectedMenu === 'Events'}
            onClick={() => handleMenuClick("/events")}
          />
          <MenuMenu position='right'>
            <MenuItem
              name='My Profile'
              active={selectedMenu === 'My Profile'}
              onClick={() => handleMenuClick("/profile")}
            />
          </MenuMenu>
        </Menu>
      </>
    )
}

export default MainMenu;