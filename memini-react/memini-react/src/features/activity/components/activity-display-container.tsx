import MuiStyledButton from '../../../mui-wrappers/mui-button-wrapper';
import React, {forwardRef, useImperativeHandle} from 'react';
import { Typography } from '@mui/material';    
import { useState } from 'react';   
import {Modal, Box} from '@mui/material';
import ActivityDisplayData from './activity-display-data';
import { set } from 'lodash';

import { X } from 'lucide-react';   
import {getEventsFromAll, getNodeByKeyApi} from '../../events/store/events-api';

const enum ActivityDisplayModes {
  MODAL,
  PAGE
}

interface ActivityDisplayProps {
  displayMode?: ActivityDisplayModes;
  canToggleActivityView?: boolean;
}


export interface ActivityDisplayRef {
  openModal: () => void;
  closeModal: () => void;
  setActivityData: (nodeKey: number) => void; 
}

const ActivityDisplayContainer  = forwardRef<ActivityDisplayRef, ActivityDisplayProps>(
    (props, ref) => { 
    
    const [activityNode, setActivityNode] = useState<any>(null);

    useImperativeHandle(ref, () => {
        return {
            openModal() {
              handleOpen();           
            },
            closeModal() {
              handleClose();
            },
            setActivityData: async (node: any) => {            
              setActivityNode(node);
            },
            setActivityDataFromNodeKey: async (nodeKey: number) => {
              console.log("Fetching activity data for nodeKey:", nodeKey);
              const response : any =  await getNodeByKeyApi(nodeKey); 
              setActivityNode(response?.ResponseObject ?? null);
            }
        };
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const toggleModal  = () => {
        setOpen(!open)
    }

    return (  
        <>  
          <Modal
                open={open}
                onClose={() => setOpen(false)}

                sx={{
                backdropFilter: 'blur(2px)',
                backgroundColor: 'transparent',
              }}
              BackdropProps={{
                sx: {
                  backgroundColor: 'transparent',
                }
              }}
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '80vh',
                bgcolor: 'background.paper',
                boxShadow: 24,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                p: 4,
              }}>
                <ActivityDisplayData activityNode={activityNode} canToggleActivityView={props.canToggleActivityView}/>  
              </Box>
                     
            </Modal>

            
       </>
    );  
});


export default ActivityDisplayContainer;


