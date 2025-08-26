import React, { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import { MuiModalRef } from "../interfaces/general-types";

import {  
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface MuiModalProps {
    modalTitle: string;
    onClose: () => void;
    onAction: () => void;
    cancelLabel: string;   
    actionLabel: string;
    children?: React.ReactNode;
}

const  MuiModal = forwardRef<MuiModalRef, MuiModalProps>(function MuiModal(
    { 
        modalTitle,
        onClose,     
        children,
    }, ref) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    useImperativeHandle(ref, () => ({
        setIsOpen: (value: boolean) => {            
            setIsOpen(value);
        }
    }));

    return (
        <Modal open={isOpen} onClose={() => {setIsOpen(false); onClose();}}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{modalTitle}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Body (custom children) */}
        <Box sx={{ mt: 2, mb: 3 }}>{children}</Box>        
      </Box>
    </Modal>
    );

});

export default MuiModal;