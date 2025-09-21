
import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { House, Home, Settings, User, Bell, HelpCircle, MessageCircle, MessageSquareText, CalendarSync, CakeSlice, Contact, MessageSquare, NotebookPen } from "lucide-react";
import SideMenuOption from "./side-menu-option"

interface SideMenuPanelProps {   

}
const SideMenuPanel : React.FC<SideMenuPanelProps> = () => {
    const navigate = useNavigate();
    const location: any = useLocation();

    const [panelWidth, setpanelWidthh] = useState('w-16');
    const [isExpanded, setIsExpanded] = useState(false);

    const menuIconOpacity = .75;    

    const onHoverIn = () => {
        setpanelWidthh('w-48');
        setIsExpanded(true);
    }

    const onHoverOut = () => {
        setpanelWidthh('w-16');
        setIsExpanded(false);
    }

    return (                          
        <div className={`${panelWidth} border-r border-r-gray-200 h-full duration-300 ease-linear grid grid-flow-col grid-rows-12 gap-2 bg-white`}
            onMouseEnter={() => {onHoverIn()}}
            onMouseLeave={() => {onHoverOut()}}
        >   
            <div className="row-span-10">
                <SideMenuOption isExpanded={isExpanded} icon={Home} isActive={true} optionText={'Home'} onClick={() => {navigate('/home')}}></SideMenuOption> 
                <SideMenuOption isExpanded={isExpanded} icon={NotebookPen} isActive={false} optionText={'Scheduler'} onClick={() => {navigate('/planning')}}></SideMenuOption> 
                <SideMenuOption isExpanded={isExpanded} icon={CakeSlice} isActive={false} optionText={'Events'} onClick={() => {navigate('/events')}}></SideMenuOption>

                <div className="border-b-2 border-gray-100 w-1/2 mx-auto mt-6 md-6"></div>
                <SideMenuOption isExpanded={isExpanded} icon={Contact} isActive={false} optionText={'Contacts'} onClick={() => {navigate('/home')}}></SideMenuOption>
                <SideMenuOption isExpanded={isExpanded} icon={MessageSquare} isActive={false} optionText={'Messages'} onClick={() => {navigate('/home')}}></SideMenuOption>
            </div>

            <div className="row-span-2">
                <div className="border-b-2 border-gray-100 w-1/2 mx-auto mt-6 md-6"></div>     
                <SideMenuOption isExpanded={isExpanded} icon={Settings} isActive={false} optionText={'Settings'} onClick={() => {navigate('/home')}}></SideMenuOption>
            </div>
        </div>
    );
};

export default SideMenuPanel;