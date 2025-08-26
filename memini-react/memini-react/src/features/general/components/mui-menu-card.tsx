import { Card, CardContent, Typography } from "@mui/material";

import {
  Work,
  School,
  FitnessCenter,
  Restaurant,
  MeetingRoom,
  Code,
  LocalHospital,
  FlightTakeoff,
  Event,
} from "@mui/icons-material";

type MuiMenuCardOptions = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export function MuiMenuCard({ title, description, icon, onClick }: MuiMenuCardOptions) {
  return (
    <Card 
      onClick={onClick}       
      sx={{ 
        cursor: "pointer", 
        borderRadius: 1, 
        boxShadow: 1, 
        "&:hover": { boxShadow: 3 } 
      }}
    >
      <CardContent className="flex flex-col items-center text-center gap-2 ">
     

        <div className="text-xs w-8 h-8 rounded-full flex items-center justify-center  text-gray-600">
              {icon}              
        </div>

        <Typography  variant="caption" color="text.secondary" >
          {description}
        </Typography>
      </CardContent>


    </Card>
  );
}