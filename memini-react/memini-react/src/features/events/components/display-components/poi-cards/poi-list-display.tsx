import { Card, CardContent, Chip, Typography, Box, Link, Tooltip } from '@mui/material';
import { LocationOn, Star, Verified, Language, Schedule } from '@mui/icons-material';
import MuiStyledButton from "../../../../../mui-wrappers/mui-button-wrapper";
import SourceLogoDisplay, {SourceAttribution} from '../../source-logos';
import { Fragment } from 'react/jsx-runtime';


interface PoiCardProps {
  source?: SourceAttribution['name'],
  label?: string;
  description?: string;
  categories?: string; // Array of categories
  city?: string;
  address?: string;
  postalCode?: string;
  rating?: number;
  totalRatings?: number;
  verified?: boolean;
  isOpen?: boolean; // true for open, false for closed
  website?: string;
}

const PoiCardDisplayList = ({
  source,
  label,
  description,
  categories,
  city,
  address,
  postalCode,
  rating,
  totalRatings,
  verified,
  isOpen,
  website
}: PoiCardProps) => {

  const location = [address, city, postalCode].filter(Boolean).join(', ');
  const categoryArray = categories ? categories.split(',').map(cat => cat.trim()).filter(Boolean) : [];

  return (
    <Card className="h-[250px] flex flex-col transition-shadow">
      <CardContent className="flex-1 overflow-hidden space-y-3">
        <div className="grid grid-cols-6">
          <div className="flex col-span-4">
            {/* Header: Label */}
            {label && (
              <Typography variant="h6" component="h3" className="font-bold line-clamp-2">
                {label}
              </Typography>
            )}
          </div>

          <div className="col-span-2 ml-auto">
              <SourceLogoDisplay source={source} />
          </div>
        </div>

   

        {/* Description */}
        {description && (
          <Typography variant="body2" className="text-gray-600 line-clamp-3">
            {description}
          </Typography>
        )}

        {/* Categories */}
        {categoryArray.length > 0 && (
          <Box className="flex gap-1 flex-wrap">
            {categoryArray.map((category, index) => (
              <MuiStyledButton 
                key={index}
                buttonSize='xs' 
                borderType='rounded' 
                highlightBackgroundOnHover={false} 
                highlightBorderOnHover={false}
              >
                <Typography variant="caption">
                  {category}
                </Typography>
              </MuiStyledButton>
            ))}
          </Box>
        )}

        {/* Rating & Status Row */}
        <Box className="flex items-center justify-between gap-2 flex-wrap">
          {/* Rating */}
          {rating !== undefined && rating !== null && (
            <Box className="flex items-center gap-1">
              <Star fontSize="small" className="text-yellow-500" />
              <Typography variant="body2" className="font-semibold">
                {rating.toFixed(1)}
              </Typography>
              {totalRatings !== undefined && totalRatings !== null && (
                <Typography variant="caption" className="text-gray-500">
                  ({totalRatings})
                </Typography>
              )}
            </Box>
          )}

          {/* Status Indicators */}
          <Box className="flex items-center gap-2 ml-auto">
            {/* Verified Badge */}
            {verified && (
              <Chip
                icon={<Verified fontSize="small" />}
                label="Verified"
                size="small"
                color="primary"
                variant="outlined"
              />
            )}

            {/* Open/Closed Status */}
            {isOpen !== undefined && isOpen !== null && (
              <MuiStyledButton 
                buttonSize='xs' 
                borderType='rounded' 
                highlightBackgroundOnHover={false} 
                highlightBorderOnHover={false}
                buttonVariant={isOpen ? 'meminiThemeOutline' : 'harmonicRed'}
              >
                <Schedule fontSize="small" className="mr-1" />
                <Typography variant="caption">
                  {isOpen ? 'Open' : 'Closed'}
                </Typography>
              </MuiStyledButton>
            )}
          </Box>
        </Box>

        {/* Location */}
        {location && (
          <Box className="flex items-start gap-1 text-gray-600">
            <LocationOn fontSize="small" />
            <Typography variant="body2" className="text-sm">
              {location}
            </Typography>
          </Box>
        )}

        {/* Website */}
        {website && (
          <Box className="flex items-center gap-1">
            <Language fontSize="small" className="text-gray-600" />
            <Link 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              variant="body2"
              className="text-sm truncate"
            >
              {website.replace(/^https?:\/\//, '')}
            </Link>
          </Box>
        )}
     
      
          
     
      </CardContent>
    </Card>
  
  );
};

export default PoiCardDisplayList;