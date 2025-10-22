import { Box, Typography, Link, Chip } from '@mui/material';

import logo from "../../../../../assets/images/memini-png.png";
import foursquareLogo from "../../../assets/images/foursquare.png";
import ticketmasterLogo from "../../../assets/images/ticketmaster.svg";

export interface SourceAttribution {
  name: 'Ticketmaster' | 'FourSquare' | 'PredictHq' | 'OpenMeteo' | 'TheNews';
  label: string;
  url: string;
  image?: any;
  width?: number;
  height?: number;
}

const sourceConfig: Record<string, SourceAttribution> = {
  Ticketmaster: {
    name: 'Ticketmaster',
    label: 'Ticketmaster',
    url: 'https://www.ticketmaster.com',
    image: ticketmasterLogo,
    width: 60,
    height: 20,
  },
  FourSquare: {
    name: 'FourSquare',
    label: 'Foursquare',
    url: 'https://foursquare.com',
    image: foursquareLogo,
    width: 24,
    height: 24,
  },
  PredictHq: {
    name: 'PredictHq',
    label: 'PredictHQ',
    url: 'https://www.predicthq.com',
    
  },
  OpenMeteo: {
    name: 'OpenMeteo',
    label: 'Open-Meteo',
    url: 'https://open-meteo.com/',
  },
  TheNews: {
    name: 'TheNews',
    label: 'The News API',
    url: 'https://www.thenewsapi.com',
  },
};

interface SourceLogoDisplayProps {
  source?: SourceAttribution['name'];
}

const SourceLogoDisplay = ({ source }: SourceLogoDisplayProps) => {
  if (!source) return null;
  
  return (
    <Link 
      href={sourceConfig[source].url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 no-underline"
    >
      {sourceConfig[source].image ? (
        <>
          <img 
            src={sourceConfig[source].image} 
            alt={sourceConfig[source].label}
            className="opacity-60"
            style={{ filter: 'grayscale(50%)' }}
            width={sourceConfig[source].width}
            height={sourceConfig[source].height}
          />
        
        </>
      ) : (
        <Typography variant="caption" className="text-gray-500 text-xs">
          {sourceConfig[source].label}
        </Typography>
      )}
    </Link>
  );
};

export default SourceLogoDisplay;