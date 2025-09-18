// import React, { useState, useEffect } from 'react';
// import { 
//   ThemeProvider, 
//   Box, 
//   Paper, 
//   Typography,
//   useTheme
// } from '@mui/material';

// import MuiWrapperPaper from '../../general/components/mui-wrapper-paper'; // Adjust import path as needed
// import { getCurrentTimePosition } from '../computes/schedule-grid-computations';

// const TimelineContent: React.FC = () => {
//   const [currentTime, setCurrentTime] = useState<Date>(new Date());
//   const theme = useTheme();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
//     return () => clearInterval(timer);
//   }, []);
 

//   return (
//         <MuiWrapperPaper
//           width={600}
//           minHeight={800}
//           position="relative"
//           overflow="hidden"
//         >

//           <Box sx={{ position: 'absolute', width: '100%', height: '100%', display: 'flex' }}>
//             <Box sx={{ width: '10%', flexShrink: 0 }}>
//               {Array.from({ length: 24 }, (_, i) => (
//                 <Box
//                   key={`time-${i}`}
//                   sx={{
//                     height: `${(1 / 24) * 100}%`,
//                     borderBottom: `1px solid ${theme.customComponents.timeline.grid.borderColor}`,
//                     display: 'flex',
//                     alignItems: 'flex-start',
//                     justifyContent: 'center',
//                     pt: 1,
//                   }}
//                 >
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: 'text.secondary',
//                       fontFamily: 'monospace',
//                       fontSize: '0.75rem',
//                     }}
//                   >
//                     {i.toString().padStart(2, '0')}:00
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>

//             <Box sx={{ width: '80%', position: 'relative' }}>
//               {Array.from({ length: 24 }, (_, i) => (
//                 <Box
//                   key={`slot-${i}`}
//                   sx={{
//                     position: 'absolute',
//                     left: 0,
//                     right: 0,
//                     top: `${(i / 24) * 100}%`,
//                     height: `${(1 / 24) * 100}%`,
//                     borderBottom: `1px solid ${theme.customComponents.timeline.grid.borderColor}`,
//                     '&:hover': {
//                       backgroundColor: theme.customComponents.timeline.grid.hoverColor,
//                     },
//                   }}
//                 >
//                   {/* This is where your schedule content will go */}
//                 </Box>
//               ))}
//             </Box>
//           </Box>

//           {/* Current Time Indicator */}
//           <Box
//             sx={{
//               position: 'absolute',
//               left: 0,
//               right: 0,
//               top: `${getCurrentTimePosition()}%`,
//               height: theme.customComponents.timeline.timeIndicator.height,
//               background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               zIndex: 10,
//               borderRadius: theme.customComponents.timeline.timeIndicator.borderRadius,
//               boxShadow: theme.customComponents.timeline.timeIndicator.shadow,
//               '&::before': {
//                 content: '""',
//                 position: 'absolute',
//                 left: -6,
//                 top: -4.5,
//                 width: theme.customComponents.timeline.timeIndicator.circleSize,
//                 height: theme.customComponents.timeline.timeIndicator.circleSize,
//                 borderRadius: '50%',
//                 background: theme.palette.primary.main,
//                 boxShadow: `0 0 12px ${theme.palette.primary.main}80, 0 0 24px ${theme.palette.primary.main}40`,
//                 border: `${theme.customComponents.timeline.timeIndicator.circleBorder} ${theme.palette.background.paper}`,
//               }
//             }}
//           />

//           {/* Vertical divider */}
//           <Box
//             sx={{
//               position: 'absolute',
//               left: 0,
//               width: '10%',
//               height: '100%',
//               background: theme.customComponents.timeline.divider.background,
//               borderRight: `${theme.customComponents.timeline.divider.borderWidth}px solid ${theme.customComponents.timeline.divider.borderColor}`,
//             }}
//           />
//         </MuiWrapperPaper>

//   );
// };

// const DailyTaskTimeline: React.FC = () => {
//   const theme = useTheme();
//   return (
//     <ThemeProvider theme={theme}>
//       <TimelineContent />
//     </ThemeProvider>
//   );
// };

// export default DailyTaskTimeline;