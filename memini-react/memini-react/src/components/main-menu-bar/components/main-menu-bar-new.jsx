import {React, Img} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/images/icons8-vivlio-400.png";
import MeminiButton from "../../general-components/components/memini-button";
import { useDispatch, useSelector } from 'react-redux';
import { meminiUserActions } from "../../../redux-memini-store";

import CabinTwoToneIcon from '@mui/icons-material/CabinTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import Tooltip from '@mui/material/Tooltip';

const MenuItem = ({ name, selectedMenu, onClick }) => {
    const isActive = selectedMenu === name ? 'main-menu-item-active' : '';

    return (
      <div
        className={`item main-menu-item ${isActive}`}
        onClick={() => onClick(name)}
      >
        {name}
      </div>
    );
};

const MenuItemIcon = ({ name, selectedMenu, onClick, children, tooltip }) => {
  const isActive = selectedMenu === name;

  return (
    <Tooltip title={tooltip || ''} arrow>
      <div
        onClick={() => onClick(name)}
        className={`flex items-center justify-center p-2 rounded-lg cursor-pointer
                    ${isActive ? 'bg-white/10' : 'bg-[#14181B]'}
                    hover:bg-white/20 transition-colors`}
      >
        {children}
      </div>
    </Tooltip>
  );
};
const UserNameArea = (props) => {
  const getFormattedUserDetails = (firstName, lastName) => {

    const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();
 
    const initials = (firstName[0] + lastName[0]).toUpperCase();
  
    const formattedFullName = `${capitalize(firstName)} ${capitalize(lastName)}`;
  
    return { formattedFullName, initials };
  };

  const { formattedFullName, initials } = getFormattedUserDetails(
    props.firstName,
    props.lastName
  );

  return <>
    <span className="text-sm font-bold">{formattedFullName}</span>

    <div className="bg-blue-500 bg-opacity-20 rounded-full w-8 h-8 flex justify-center items-center text-xs font-bold text-blue-500">
      {initials}
    </div>
  </>
}


const UserProfileArea = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorisationToken = useSelector((state) => state.meminiUser); 
  const isLoggedIn = Boolean(authorisationToken.userSession);
  
  function logout() {
    dispatch(meminiUserActions.logout());
    navigate('/home');
  }

  return (
    <> 
      <div className="col-span-2 flex justify-end items-center space-x-2 pr-2">
        {
          isLoggedIn && <>
            <UserNameArea firstName={authorisationToken.userSession.firstName} lastName={authorisationToken.userSession.lastName}>
              
            </UserNameArea>
            

            <MeminiButton type="negative" size="small" onClick={() => {logout()}}>
            Logout
            </MeminiButton>
            </>
        }
        {
        !isLoggedIn && <>
          <MeminiButton type="positive" size="small" onClick={() => {navigate('/login')}}>
            Login
          </MeminiButton>          
        </>
        }        
      </div> 
    </>
  );
}


export default function MainMenu () {
    const navigate = useNavigate();
    const location = useLocation();
    const userSession = useSelector((state) => state.meminiUser.userSession);
    
    const pathToMenuMap = {
        "/home": "Home",
        "/planning": "Planning",
        "/events": "Events",
        "/profile": "My Profile",    
      };

    const selectedMenu = pathToMenuMap[location.pathname] || "Home";

    const handleMenuClick = (path) => {
        navigate(path);
    };  

    return (
      <>  
        <div className="grid grid-cols-8 menu-bar-row h-full items-center"> 
            <div className="col-span-2 pl-2 mr-2 ml-2">              
                <SupervisedUserCircleRoundedIcon className="text-red-400" fontSize="large">                  
                </SupervisedUserCircleRoundedIcon>  
                <span className="ml-2">
                  Memini 
                </span>    
            </div>
            <div className="col-span-4">            
                <div className="ui menu secondary centered-menu justify-center">  
                    <MenuItemIcon 
                      name="Home" 
                      selectedMenu={selectedMenu} 
                      onClick={() => {handleMenuClick('/home')}}
                      tooltip="Home">
                      <CabinTwoToneIcon fontSize="large">
                      </CabinTwoToneIcon>
                    </MenuItemIcon>

                    {
                      userSession && 
                        <MenuItemIcon 
                          name="Planning" 
                          selectedMenu={selectedMenu} 
                          onClick={() => {handleMenuClick('/planning')}}
                          tooltip="Planning">
                          <EventNoteTwoToneIcon fontSize="large"></EventNoteTwoToneIcon>
                        </MenuItemIcon>
                    }

                    <MenuItemIcon 
                      name="About" 
                      selectedMenu={selectedMenu} 
                      onClick={() => {handleMenuClick('/about')}}
                      tooltip="About Memini">
                      <InfoTwoToneIcon fontSize="large"></InfoTwoToneIcon>
                    </MenuItemIcon>
                </div>
            </div>   
            <UserProfileArea></UserProfileArea>                        
        </div>
   


      </>
    )
}