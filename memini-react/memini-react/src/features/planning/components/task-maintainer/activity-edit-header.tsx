import {  
  Typography,
 
} from '@mui/material';

import MuiStyledButton from "../../../../mui-wrappers/mui-button-wrapper";
import { PackagePlus} from "lucide-react";
import { useRef } from 'react';
import ActivityDisplayContainer from "../../../activity/components/activity-display-container";
import { ActivityDisplayRef } from "../../../activity/components/activity-display-container";

const ActivityEditHeader = () => { 
  const activityDisplayRef = useRef<ActivityDisplayRef>(null);
  return (
    <>
     <ActivityDisplayContainer ref={activityDisplayRef}/>

    <div className="grid grid-cols-6 transition-all duration-300 ease-in-out">

        <div className="col-span-3 flex items-center justify-start w-full overflow-hidden">
            <Typography variant="h5" className="break-words w-full">
                Management
            </Typography>
        </div>

        <div className="col-span-3 flex items-center justify-end">
          <MuiStyledButton themeColor = 'light' buttonSize = 'md' buttonVariant = 'harmonicBlue' borderType = 'semiStraight' 
              opacity={1.0} highlightBorderOnHover={true} highlightBackgroundOnHover={true} applyThemeFontColor={true} textOpacity={1.0}        
              onClick={() => {activityDisplayRef.current?.openModal()}}
              >
              <PackagePlus size={16} style={{ marginLeft: '0', marginRight: '.25rem', opacity:0.85 }}/>
              <Typography 
                    variant="body2" 
                    color="inherit"                     
                    > 
                    Create Activity 
                </Typography>            
            </MuiStyledButton>
        </div>

        <div className="col-span-5 flex items-start mt-4">
            <Typography variant="body2" color="text.secondary">
                Use the button above or drag a favorited/recent activity to the scheduler to create a new activity.
            </Typography>  
        </div>

        <div className="col-span-6 border-t border-t-gray-200 w-3/4 mt-2">
        </div>  
    </div>
    </>
  )
}

export default ActivityEditHeader;