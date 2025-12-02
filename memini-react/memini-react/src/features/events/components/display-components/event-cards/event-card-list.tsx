import { Card, CardContent, CardMedia, Chip, Typography, Box, Link, Tooltip } from '@mui/material';
import { CalendarToday, LocationOn } from '@mui/icons-material';
import SourceLogoDisplay, {SourceAttribution} from '../../source-logos';
import MuiStyledButton from "../../../../../mui-wrappers/mui-button-wrapper";
import logo from "../../../../../assets/images/memini-png.png";
import LucidIconButton from "../../../../../lucid/lucid-button-icon"
import { icons, NotebookPen, Ticket, Tickets } from 'lucide-react';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

interface EventCardProps {
  nodeKey?: number;
  source?: SourceAttribution['name'],
  category?: string;
  genre?: string;
  imageUrl?: string;
  label?: string;
  date?: string; // timestampz
  country?: string;
  city?: string;
  address?: string;
  venueName?: string;
  availability?: string;
  price?: number | string;
  website?: string;
  onSelectActivity?: (node:any) => void;
}

const EventCardDisplayList = ({
  nodeKey,
  source,
  category,
  genre,
  imageUrl,
  label,
  date,
  country,
  city,
  address,
  venueName,
  availability,
  price,
  website,
  onSelectActivity
}: EventCardProps) => {
  
  const formatDate = (timestamp?: string) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const location = [city, country].filter(Boolean).join(', ');
  console.log(onSelectActivity);
  return (
    <Card className="h-full transition-shadow flex flex-col">
      {/* Header: Category and Genre */}
      {(category || genre) && (
        <Box className="flex justify-between items-center px-4 pt-3 pb-2">
          {category && (
            <Typography variant="overline" className="font-semibold text-primary">
              {category}
            </Typography>
          )}
         

          <div className="col-span-2 ml-auto">
              <SourceLogoDisplay source={source} />
          </div>                     
        </Box>        
      )}     

      {/* Image */}
      {imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={label || 'Event'}
          className="aspect-video w-full object-cover"
        />
      )}

      <CardContent className="flex-grow flex flex-col">
        <div className="space-y-2">
          <div className="grid grid-cols-12">
              <div className="flex flex-col col-span-12">
                  {/* Label */}
                  {label && (
                  <Typography variant="h6" component="h3" className="font-bold line-clamp-2">
                  {label}
                  </Typography>
                  )}
              </div>
  
          <div className="flex flex-col col-span-8 mt-1">
                  {/* Date */}
                      {date && (
                      <Box className="flex items-center gap-1 text-gray-600">
                          <CalendarToday fontSize="small" />
                          <Typography variant="body2">
                          {formatDate(date)}
                          </Typography>
                      </Box>
                      )}
          </div>    
          </div>
          {/* Location */}
          {(location || venueName || address) && (
            <Box className="flex items-start gap-1 text-gray-600">
              <LocationOn fontSize="small" />
              <Box>
                {venueName && (
                  <Typography variant="body2" className="font-medium">
                    {venueName}
                  </Typography>
                )}
                {address && (
                  <Typography variant="body2" className="text-sm">
                    {address}
                  </Typography>
                )}
                {location && (
                  <Typography variant="body2" className="text-sm">
                    {location}
                  </Typography>
                )}
              </Box>
            </Box>
          )}


          {genre && (
          <MuiStyledButton buttonSize='xs' borderType='straight' highlightBackgroundOnHover={false} highlightBorderOnHover={false} className="hover:cursor-text">
            <Typography variant="subtitle2" >
              {genre}
            </Typography>
          </MuiStyledButton>            
          )}

        </div>

      

        {/* Spacer */}
        <div className="flex-grow mt-2"></div>

        {/* Bottom row - pushed to bottom */}
        <div className="flex justify-between items-center pt-2">
          

           {(availability || price) && (
              <Box className="flex gap-2 flex-wrap items-center">
                  {availability && 

                    
                    <Tooltip title="Buy tickets">
                    <MuiStyledButton className="flex items-center" buttonSize='xs' borderType='rounded' highlightBackgroundOnHover={true} highlightBorderOnHover={true} 
                        buttonVariant={availability.toLowerCase() === 'available' ? 'meminiThemeProfile_2' : 'harmonicRed'}>
                       
                        <ConfirmationNumberOutlinedIcon 
                          sx={{ 
                            fontSize: 14, 
                            mr: 0.5, 
                            opacity: 0.75 
                          }} 
                        />
                       

                        <Typography variant="subtitle2" fontSize={10}>
                            <Link 
                              href={website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              variant="body2"
                              className="text-sm truncate"
                              underline="none"
                            >
                            {availability}
                            </Link>                          
                        </Typography>
                      </MuiStyledButton>
                      </Tooltip>
            
                    
                  }
                  {price && (
                  <Chip 
                      label={typeof price === 'number' ? `$${price}` : price}
                      size="small" 
                      color="primary"
                      variant="outlined"
                  />
                  )}
            </Box>
          )}

            <Tooltip title="Add to schedule">
            <MuiStyledButton onClick={onSelectActivity} className="flex items-center" buttonSize='xs' borderType='rounded' highlightBackgroundOnHover={true} highlightBorderOnHover={true} 
                buttonVariant='meminiThemeProfile_2'  >
                  
                  <NotebookPen size={13} opacity={.5}
                    className="mr-0.5 !opacity-75">
                  </NotebookPen>
               
       
                <Typography variant="subtitle2" fontSize={10}>
                    <Link                       
                      target="_blank" 
                      rel="noopener noreferrer"
                      variant="subtitle2"
                      className="text-sm truncate"
                      underline="none"
                      
                    >
                      Schedule
                    </Link>                          
                </Typography>
              </MuiStyledButton>
            </Tooltip>

        </div>
       
      </CardContent>

      
    </Card>
  );
};

export default EventCardDisplayList;