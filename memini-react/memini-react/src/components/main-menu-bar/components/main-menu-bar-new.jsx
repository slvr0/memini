import {React, Img} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/images/icons8-vivlio-400.png";
import MeminiButton from "../../general-components/components/memini-button";
import { useDispatch, useSelector } from 'react-redux';
import { meminiUserActions } from "../../../redux-memini-store";

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


const MainMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const pathToMenuMap = {
        "/home": "Home",
        "/planning": "Planning",
        "/events": "Events",
        "/profile": "My Profile",
        "/ui-test": "UiTest",
      };

    const selectedMenu = pathToMenuMap[location.pathname] || "Home";

    const handleMenuClick = (path) => {
        navigate(path);
    };  

    return (
      <>  
        <div className="grid grid-cols-8 menu-bar-row"> 
            <div className="col-span-2 pl-2">              
                <img src={logo} alt="Logo" width={50} height={50}/>                 
            </div>
            <div className="col-span-4">            
                <div className="ui menu secondary centered-menu justify-center">  
                    <MenuItem name="Home" selectedMenu={selectedMenu} onClick={() => {handleMenuClick('/home')}} />
                    <MenuItem name="Planning" selectedMenu={selectedMenu} onClick={() => {handleMenuClick('/planning')}} />
                    <MenuItem name="Events" selectedMenu={selectedMenu} onClick={() => {handleMenuClick('/events')}} />     
                    <MenuItem name="About" selectedMenu={selectedMenu} onClick={() => {handleMenuClick('/about')}} />                                
                </div>
            </div>    

            <UserProfileArea></UserProfileArea>                        
        </div>
   

        <div className="grid grid-cols-2 gap-4 items-center menu-subheader-row">
            <div className="col-span-1 p-4 flex items-center font-xs">
               
            </div>

            <div className="col-span-1 p-4 flex justify-end items-center">
                <div className="ui mini breadcrumb">
                    <a className="section">Home</a>
                    <i className="right chevron icon divider"></i>
                    <a className="section">Planning</a>
                    <i className="right chevron icon divider"></i>
                    <div className="active section">New planning tag</div>
                </div>
            </div>
        </div>

      </>
    )
}

export default MainMenu;