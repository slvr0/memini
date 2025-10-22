import { Card, CardContent, CardMedia, Chip, Typography, Box, Link } from '@mui/material';
import { CalendarToday, LocationOn } from '@mui/icons-material';
import SourceLogoDisplay, {SourceAttribution} from '../../source-logos';
import MuiStyledButton from "../../../../../mui-wrappers/mui-button-wrapper";
import logo from "../../../../../assets/images/memini-png.png";

interface EventCardProps {
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
}

const EventCardDisplayList = ({
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
  website
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

  return (
    <Card className="h-full transition-shadow">
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

      <CardContent className="space-y-2">

        <div className="grid grid-cols-12">
            <div className="flex flex-col col-span-8">
                {/* Label */}
                {label && (
                <Typography variant="h6" component="h3" className="font-bold line-clamp-2">
                {label}
                </Typography>
                )}
            </div>
        <div className="flex flex-col col-span-4 ml-auto">
            {/* Status Tags */}
            {(availability || price) && (
            <Box className="flex gap-2 flex-wrap">
                {availability && 
                  <MuiStyledButton buttonSize='xs' borderType='rounded' highlightBackgroundOnHover={true} highlightBorderOnHover={true} 
                      buttonVariant={availability.toLowerCase() === 'available' ? 'meminiThemeOutline' : 'harmonicRed'}>
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

   <div className="flex justify-between items-end mt-auto">
  <div>
    {genre && (
      <MuiStyledButton buttonSize='xs' borderType='straight' highlightBackgroundOnHover={false} highlightBorderOnHover={false} className="hover:cursor-text">
        <Typography variant="subtitle2" >
          {genre}
        </Typography>
      </MuiStyledButton>            
    )}
  </div>
  
  <div>
    <MuiStyledButton buttonSize='xs' borderType='rounded' highlightBackgroundOnHover={true} highlightBorderOnHover={true}>
      <div className="mx-0">
        <Box
          component="img"
          src={logo}
          alt="App Icon"
          sx={{
            width: 18,
            height: 18,
            zIndex: 9999
          }}
        />
      </div>
      <Typography variant='subtitle2' fontSize={11}>
        Add
      </Typography>
    </MuiStyledButton>
  </div>
</div>
       
      </CardContent>

      
    </Card>
  );
};

export default EventCardDisplayList;