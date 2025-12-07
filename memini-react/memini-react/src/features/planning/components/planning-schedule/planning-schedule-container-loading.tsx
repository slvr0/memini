import React from 'react';
import { Card, CardContent, Skeleton, Box, Typography } from '@mui/material';

/*
    Used when re-fetching / updating container structure or when we have loading issues like no connection etc.
*/

const PlanningScheduleContainerLoading: React.FC = () => {
    return (
        <Box sx={{ width: '100%', p: 2 }}>
            {/* Header skeleton */}
            <Card sx={{ mb: 2, overflow: 'hidden' }}>
                <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2, alignItems: 'center' }}>
                        <Skeleton variant="text" width={60} height={24} />
                        {Array.from({ length: 7 }).map((_, index) => (
                            <Skeleton key={index} variant="text" width={80} height={24} />
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Main scheduler skeleton */}
            <Card sx={{ overflow: 'hidden' }}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', minHeight: '600px' }}>
                        {/* Time column */}
                        <Box sx={{ borderRight: 1, borderColor: 'divider', p: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {Array.from({ length: 24 }).map((_, index) => (
                                    <Skeleton 
                                        key={index} 
                                        variant="text" 
                                        width={40} 
                                        height={20}
                                        animation="wave"
                                        sx={{ 
                                            animationDelay: `${index * 0.1}s`,
                                            animationDuration: '2s'
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Day columns */}
                        {Array.from({ length: 7 }).map((_, dayIndex) => (
                            <Box 
                                key={dayIndex} 
                                sx={{ 
                                    borderRight: dayIndex < 6 ? 1 : 0, 
                                    borderColor: 'divider', 
                                    p: 1,
                                    position: 'relative'
                                }}
                            >
                                {/* Random task-like skeletons */}
                                {Array.from({ length: Math.floor(Math.random() * 4) + 1 }).map((_, taskIndex) => {
                                    const randomHeight = Math.floor(Math.random() * 80) + 40;
                                    const randomTop = Math.floor(Math.random() * 400) + 20;
                                    
                                    return (
                                        <Skeleton
                                            key={taskIndex}
                                            variant="rectangular"
                                            width="90%"
                                            height={randomHeight}
                                            animation="wave"
                                            sx={{
                                                position: 'absolute',
                                                top: randomTop,
                                                left: '5%',
                                                borderRadius: 1,
                                                animationDelay: `${(dayIndex * 0.2) + (taskIndex * 0.3)}s`,
                                                animationDuration: '2.5s'
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Loading text */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton variant="circular" width={20} height={20} animation="pulse" />
                    <Typography variant="body2" color="text.secondary">
                        Loading your schedule...
                    </Typography>
                    <Skeleton variant="circular" width={20} height={20} animation="pulse" sx={{ animationDelay: '0.5s' }} />
                </Box>
            </Box>
        </Box>
    );
};

export default PlanningScheduleContainerLoading;