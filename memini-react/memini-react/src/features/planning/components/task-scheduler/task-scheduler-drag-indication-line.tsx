// DragCursorLine.tsx
import { useDragLayer } from 'react-dnd';
import { DragItemType } from "../../../tasks/components/display-task"

import { Typography, Box, Paper } from '@mui/material';

import { minutesToHHMM } from "../../../tasks/computes/time-display-formatting";
import { calculateTaskPixelTime } from '../../computes/task-scheduler-computations';

interface DragCursorLineProps {
    schedulerHeight: number; 
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const DragCursorLine: React.FC<DragCursorLineProps> = ({ schedulerHeight, containerRef }) => {
    const { isDragging, currentOffset, itemType } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getClientOffset(),
        itemType: monitor.getItemType(),
    }));

    if (!isDragging || itemType !== DragItemType.TASK || !currentOffset || !containerRef.current) {
        return null;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeY = currentOffset.y - containerRect.top;

    if(relativeY < 0)
        return(<></>);

    return (
        <div 
            className="fixed w-full pointer-events-none z-50 flex items-center"
            style={{ 
                top: `${currentOffset.y}px`,
                transform: 'translateY(-50%)'
            }}
        >
           <Box sx={{ position: 'relative', mr: 2 }}>
                <Paper 
                    elevation={4}
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.75,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: 1,
                        position: 'relative'
                    }}
                >
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
                        {minutesToHHMM(calculateTaskPixelTime(relativeY, schedulerHeight))}
                    </Typography>
                </Paper>
       
                <Box 
                    sx={{ 
                        position: 'absolute',
                        right: -8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderLeft: '8px solid',
                        borderLeftColor: 'primary.main',
                    }}
                />
            </Box>
            
            <div className="flex-1 border-t-2 border-dashed border-blue-300" />
        </div>
    );
};

export default DragCursorLine;