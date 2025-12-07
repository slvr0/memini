
import React, { useState, createRef, Fragment, useEffect } from 'react';
import RecentAccordionSegment from "./recent-accordion-segment"
import FavoriteAccordionSegment from "./favorite-accordion-segment"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { groupNodesByDay } from "../../computes/task-scheduler-computations"
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box,
  Button,
  Typography,
 
} from '@mui/material';

interface TaskMaintainerRecentFavoritesProps {

}

const durationInterval = (duration: number) : number[] => {
    const now = new Date();
    const start = now.getHours() * 60;
    const end = (now.getHours() + (duration / 60)) * 60;
    return [start, end];
}

type PanelType = 'favorites' | 'recent' | false;

const TaskMaintainerRecentFavorites : React.FC<TaskMaintainerRecentFavoritesProps> = () => {
      const [expanded, setExpanded] = useState<PanelType>('recent');
    
      const handleChange = (panel: 'favorites' | 'recent') => 
        (event: React.SyntheticEvent, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
        };



    // const [favorites, setFavorites] = useState<IStoredUserTask[]>([]);
    // const [recent, setRecent] = useState<IStoredUserTask[]>([]);

    useEffect(() => {
        // const fetchRecentAndFavorites = async () => {
        //     const response = await fetchRecentAndFavoriteTasks();       
            
        //     if (response) {
        //         setRecent(response.ResponseObject.Recent);
        //         setFavorites(response.ResponseObject.Favorites);                
        //     }
        // };
        // fetchRecentAndFavorites();
    } , [])

    const onSelectRecentFavorite = (selected : any) => {
        const interval = durationInterval(selected.Duration ?? 60);

        const dateNow = new Date();
        const selectedStoredTaskAsITask : any = {
            UserTaskKey : 0,
            Title: selected.Title,
            Description: selected.Description,
            StartTime: interval[0],
            EndTime: interval[1],
            Year: dateNow.getFullYear(),
            Month: dateNow.getMonth(),
            Day: dateNow.getDate()
        }

        // setSelectedTask(selectedStoredTaskAsITask);
    }   

    return (
        <Fragment>
    {/* Favorites Accordion */}
    <Accordion 
        expanded={expanded === 'favorites'} 
        onChange={handleChange('favorites')}
        defaultExpanded 
        disableGutters 
        square
        className="transition-all duration-500 ease-in-out"                   
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="favorites-content"
            id="favorites-header"
            className="transition-all duration-300 ease-in-out"
        >
            <Typography component="span" fontWeight="medium">
                Favorites
            </Typography>
        </AccordionSummary>
          
        {/* <FavoriteAccordionSegment onSelect={(selected: IStoredUserTask) => {onSelectRecentFavorite(selected)}} storedTasks={favorites}/>   */}
    </Accordion>

    {/* Recent Accordion */}
    <Accordion 
        expanded={expanded === 'recent'} 
        onChange={handleChange('recent')}
        defaultExpanded 
        disableGutters 
        square
        className="transition-all duration-500 ease-in-out"                   
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="recent-content"
            id="recent-header"
            className="transition-all duration-300 ease-in-out"
        >
            <Typography component="span" fontWeight="medium">
                Recent
            </Typography>
        </AccordionSummary>
          
        {/* <RecentAccordionSegment onSelect={(selected: IStoredUserTask) => {onSelectRecentFavorite(selected)}} storedTasks={recent}/>     */}
    </Accordion>
</Fragment>
        ); 
}

export default TaskMaintainerRecentFavorites;