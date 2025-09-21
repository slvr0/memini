
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/images/memini-png.png";
import MeminiButton from "./memini-button";
import { useDispatch, useSelector } from 'react-redux';
import { meminiUserActions } from "../../../store/user-calendar-store";
import CabinTwoToneIcon from '@mui/icons-material/CabinTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import LocationDisplay from "../../../features/user/components/localization"
import UserProfileCircle from "../../../features/user/components/user-profile-circle"
import Tooltip from '@mui/material/Tooltip';
import { RootState } from "../../../store";

import { Hub } from '@mui/icons-material';
import { Link } from '@mui/icons-material';

import MUI_StyledButton from "../../../mui/mui-button-wrapper";
import MUI_StyledSegment from "../../../mui/mui-segment-wrapper"
import LucidIconButton from "../../../lucid/lucid-button-icon"

import { Typography, Box } from "@mui/material";
import { ConnectWithoutContact } from '@mui/icons-material';


import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';
import { Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText } from "lucide-react";

//name, selectedMenu, onClick
const MenuItem = (props:any) => {
    const isActive = props.selectedMenu === props.name ? 'main-menu-item-active' : '';

    return (
      <div
        className={`item main-menu-item ${isActive}`}
        onClick={() => props.onClick(props.name)}
      >
        {props.name}
      </div>
    );
};

//{ name, selectedMenu, onClick, children, tooltip }
const MenuItemIcon = (props: any) => {
  const isActive = props.selectedMenu === props.name;

  return (
    <Tooltip title={props.tooltip || ''} arrow>
      <div
        onClick={() => props.onClick(props.name)}
        className={`flex items-center justify-center p-2 rounded-lg cursor-pointer
                    ${isActive ? 'bg-white/10' : 'bg-[#14181B]'}
                    hover:bg-white/20 transition-colors`}
      >
        {props.children}
      </div>
    </Tooltip>
  );
};

const UserNameArea = (props: any) => {
  const getFormattedUserDetails = (firstName: string, lastName: string) => {

    const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase();
 
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

const UserProfileArea = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorisationToken = useSelector((state: RootState) => state.meminiUser); 
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
    const location: any = useLocation();
    const userSession = useSelector((state: RootState) => state.meminiUser.userSession);
    
    const pathToMenuMap: any = {
        "/home": "Home",
        "/planning": "Planning",
        "/events": "Events",
        "/profile": "My Profile",    
      };

    const selectedMenu = pathToMenuMap[location.pathname] || "Home";

    const handleMenuClick = (path: string) => {
        navigate(path);
    }; 

    return (
      <>  
        <div className="h-16 border border-gray-200 bg-white flex items-center gap-x-4 z-9999"> 
          <Box
          component="img"
          src={logo}
          alt="App Icon"
            sx={{
              width: 32,
              height: 32,
              ml:'0.5rem',          
              zIndex: 9999          
            }}
          />
          
          <div>
            <Typography variant="subtitle1"> Memini </Typography>
            <Typography variant="subtitle2"> Version 1.0.1, alpha </Typography>
          </div>
          
          <Slash size={14} style={{transform: 'rotate(-10deg)', opacity:0.5 }}/>
          
          <Boxes size={14} style={{opacity:0.5}} />

          <Typography variant="subtitle1">          
            Dan Johansson
          </Typography>

          <MUI_StyledButton themeColor = 'light' buttonSize = 'xs' buttonVariant = 'main' borderType = 'rounded' opacity={.85}> 
            <Typography variant="subtitle2"> Free </Typography>
          </MUI_StyledButton>

          <ChevronsUpDown size={14} style={{opacity:0.5 }} />

          <Slash size={14} style={{transform: 'rotate(-10deg)', opacity:0.5 }}/>
          
          <LocationDisplay></LocationDisplay>

          <Globe size={14}  style={{color:"#6ce699", opacity:0.75}} />
          <Combine size={14} style={{opacity:0.75}}/>
         
          <Slash size={14} style={{transform: 'rotate(-10deg)', opacity:0.5 }}/>

          <MUI_StyledButton themeColor = 'light' buttonSize = 'sm' buttonVariant = 'main' borderType = 'rounded' 
              opacity={1.0} highlightBorderOnHover={true} highlightBackgroundOnHover={true} applyThemeFontColor={false}>
              <Plug size={14} style={{ marginRight: '.25rem', transform: 'rotate(90deg)', opacity:0.75 }}/>
              <Typography variant="subtitle2"> Connect with people </Typography>
          </MUI_StyledButton>
            
    
          <span className="ml-auto flex items-center gap-2" style={{marginRight: '0.5rem'}}>
            <MUI_StyledSegment spacing="segmentMini" borderProfile="rounded">     
                <LucidIconButton
                icon={MessageSquareText}
                size={16}
                opacity={.75}
                palette="main"
                borderProfile="rounded"
                highlightBackgroundOnHover={true}
                highlightBorderOnHover={true}
                displayBorder={false}
                tooltip="View Messages"
                onClick={() => console.log("Clicked Home")}
                />              
              <LucidIconButton
                icon={Bell}
                size={16}
                opacity={.75}
                palette="main"
                borderProfile="rounded"
                highlightBackgroundOnHover={true}
                highlightBorderOnHover={true}
                displayBorder={false}
                tooltip="Notifications"
                onClick={() => console.log("Clicked Home")}
              />
              <LucidIconButton
                icon={Settings}
                size={16}
                opacity={.75}
                palette="main"
                borderProfile="rounded"
                highlightBackgroundOnHover={true}
                highlightBorderOnHover={true}
                displayBorder={false}
                tooltip="Settings/Preferences"
                onClick={() => console.log("Clicked Home")}
              />
              <LucidIconButton
                icon={HelpCircle}
                size={ 16 }
                opacity={.75}
                palette="main"
                borderProfile="rounded"
                highlightBackgroundOnHover={true}
                highlightBorderOnHover={true}
                displayBorder={false}
                tooltip="About Memini"
                onClick={() => console.log("Clicked Home")}
              />        
            </MUI_StyledSegment>
              <MUI_StyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'main' borderType = 'rounded' opacity={.95} highlightBorderOnHover={false} highlightBackgroundOnHover={true}>                
                <Typography variant="subtitle2" color={'black'}> Feedback </Typography>
              </MUI_StyledButton>
            <UserProfileCircle user={{name:'Dan Johansson', email:'johansson_dan@hotmail.com', avatar:null }}></UserProfileCircle>          


           
          </span>



        </div>
      </>
    )
}