import { Typography, Box, TypographyProps  } from "@mui/material";

interface TaskSchedulerTimemarkerDisplayProps {       
    timeslotHeight: number;
    typographyVariant?: TypographyProps['variant'];
}

const TaskSchedulerTimemarkerDisplay : React.FC<TaskSchedulerTimemarkerDisplayProps> = ({
    timeslotHeight,
    typographyVariant = 'subtitle2'
}) => {
    return (    
        <div className="flex flex-col justify-center h-full border-r border-r-gray-100 ">
                    {Array.from({ length: 24 }, (_, i) => (
                    <Box
                    key={`time-${i}`}
                    sx={{
                        height: timeslotHeight,                        
                        minHeight: timeslotHeight,
                        flex: 'none',    
                        display: 'flex',       
                        textAlign: 'center',   
                        justifyContent: 'center',   
                        pt: 1,
                    }}
                    >
                    <Typography
                    variant={typographyVariant}
                    sx={{
                    color: 'text.secondary',
                    }}
                    >
                    {i.toString().padStart(2, '0')}:00
                    </Typography>
                    </Box>
                    ))}
                </div>)
}

export default TaskSchedulerTimemarkerDisplay;