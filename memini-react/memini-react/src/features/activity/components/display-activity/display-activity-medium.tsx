import {DisplayLayoutProps} from "./display-activity"

import Tooltip from '@mui/material/Tooltip';
import { Typography } from "@mui/material";
import { MapPinned, Hourglass } from 'lucide-react';

const DisplayActivityMedium : React.FC<DisplayLayoutProps> = (
    {                
        ...props
    }

) => {    
    return (
 
       <div className="grid grid-rows-[auto_auto_auto_1fr] h-full w-full overflow-hidden p-1 gap-0.5"> 
       {props.location && 
        <div className="flex overflow-hidden w-full items-center justify-start p-1 gap-1">
            <MapPinned size={12} opacity={.75} />
            <Typography
                variant="caption"
                className="text-left w-full min-w-0 break-words"
                color="text.secondary"
                style={{ 
                    fontSize: '11px',             
                    lineHeight: '.75rem',       
                }}
            >
                {props.location}
            </Typography>
        </div>
       }
    

    <div className="flex overflow-hidden w-full items-start justify-start ml-1 line-clamp-3 px-1">
        <Typography
            variant="body2"
            fontWeight='medium'
            className="text-left w-full min-w-0 break-words line-clamp-3"
            style={{ 
                WebkitLineClamp: 3,
                lineHeight: '.9rem',       
            }}
        >
            {props.label}
        </Typography>            
    </div>

    <div className="flex overflow-hidden w-full items-start justify-start ml-1 px-1">
        <Typography
            variant="caption"
            className="text-left w-full min-w-0 break-words"
            color="text.secondary"
            style={{ 
                
                fontSize: '11px',             
                lineHeight: '.75rem',       
            }}
        >
            <i>{props.category}</i>
        </Typography>
    </div>

    <div className="flex overflow-hidden w-full items-start justify-start mt-2 ml-1 px-1">
        <Typography
            variant="caption"
            className="text-left w-full min-w-0 break-words"
            color="text.secondary"
            style={{ 
                fontSize: '11px',             
                lineHeight: '.8rem',       
            }}
        >
            {props.description}
        </Typography>
    </div>
</div>
     
    )
}

export default DisplayActivityMedium;