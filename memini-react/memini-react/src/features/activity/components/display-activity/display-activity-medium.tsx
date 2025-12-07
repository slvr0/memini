import {DisplayLayoutProps} from "./display-activity"

import Tooltip from '@mui/material/Tooltip';
import { Typography } from "@mui/material";

const DisplayActivityMedium : React.FC<DisplayLayoutProps> = (
    {                
        ...props
    }

) => {    
    return (
 
            <div className="h-full w-full p-1 overflow-hidden flex items-center justify-between min-h-0">
                <Typography 
                    variant="subtitle2" 
                    className="font-semibold opacity-1 flex-1 truncate text-ellipsis whitespace-nowrap" 
                    style={{
                        color: 'black', 
                        fontSize: '10px',
                        letterSpacing: '.025rem',
                        minWidth: 0
                    }}
                > 
                {props.label  +  (props.description ? ' - ' + props.displaytime : '' )}
                </Typography>                
            </div>
     
    )
}

export default DisplayActivityMedium;