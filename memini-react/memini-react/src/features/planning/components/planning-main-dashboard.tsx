
import "../css/planning-main-dashboard.css"

import ManageTaskTab from "./manage-task-tab";

import Tooltip from '@mui/material/Tooltip';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import CrisisAlertRoundedIcon from '@mui/icons-material/CrisisAlertRounded';
import CalendarViewWeekRoundedIcon from '@mui/icons-material/CalendarViewWeekRounded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Divider from '@mui/material/Divider';
import React from "react";

const PlanningMainDashboard = (props: any) => {

  const headerText = props.headerText;
  const subHeaderTtext = props.subHeaderText; 

  return (
  <div className="memini-container-section">
    {/* Header Row */}
    <div className="flex items-center justify-between p-4">
    
    {/* Left: Title */}
    <div className="flex items-start gap-4">
      <div className="w-1 h-10 bg-red-200 rounded-sm mt-1"></div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{headerText}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {subHeaderTtext}
        </p>
      </div>
    </div>

    {/* Right: Buttons + Icon */}
    <div className="items-center flex-1 flex justify-end gap-4 ml-1 mr-1">
         <Tooltip title={"Add new task"} arrow>
                    <div
                    onClick={() => console.log("hello")}
                    className={`flex items-center justify-center p-2 rounded-lg cursor-pointer                    
                    hover:bg-gray-100 transition-colors `}
                    >
                    <AddRoundedIcon ></AddRoundedIcon>
                    </div>
                    </Tooltip>                  

                    <Tooltip title={"Upcoming tasks, reminders."} arrow>
                    <div
                    onClick={() => console.log("hello")}
                    className={`flex items-center justify-center p-2 rounded-lg cursor-pointer                    
                    hover:bg-gray-100 transition-colors `}
                    >
                    <CrisisAlertRoundedIcon ></CrisisAlertRoundedIcon>
                    </div>
                    </Tooltip>

                    <Tooltip title={"More..."} arrow>
                    <div
                    onClick={() => console.log("hello")}
                    className={`flex items-center justify-center p-2 rounded-lg cursor-pointer                    
                    hover:bg-gray-100 transition-colors `}
                    >
                    <DehazeRoundedIcon ></DehazeRoundedIcon>
                    </div>
                    </Tooltip>
    </div>
  </div>
    <Divider  flexItem />
  {/* Menu Row */}
  <div>
        <Tabs value={0} onChange={() => {}} aria-label="icon tabs example">
            <Tab icon={<ManageSearchRoundedIcon />} aria-label="phone" label="Manage tasks" />
            <Tab icon={<QueryStatsRoundedIcon />} aria-label="favorite" label="Tracking" />
            <Tab icon={<CalendarViewWeekRoundedIcon />} aria-label="person" label="Week overview" />       
        </Tabs>
  </div>

  <div>
    <ManageTaskTab ></ManageTaskTab>

  </div>
        
  </div>
  

    );
  };

  export default PlanningMainDashboard;