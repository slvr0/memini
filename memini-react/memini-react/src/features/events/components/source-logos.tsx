import { Box, Typography, Link, Chip } from '@mui/material';

import logo from "../../../../../assets/images/memini-png.png";
import foursquareLogo from "../../../assets/images/foursquare.png";
import ticketmasterLogo from "../../../assets/images/ticketmaster.svg";
import predictHQLogo from "../../../assets/images/predict-hq-cropped.svg"
import openmeteoLogo from "../../../assets/images/open-meteo.png"


export interface SourceAttribution {
  name: 'Ticketmaster' | 'FourSquare' | 'PredictHq' | 'OpenMeteo' | 'TheNews';
  label: string;
  url: string;
  image?: any;
  width?: number;
  height?: number;
  className?:string;
}

const sourceConfig: Record<string, SourceAttribution> = {
  Ticketmaster: {
    name: 'Ticketmaster',
    label: 'Ticketmaster',
    url: 'https://www.ticketmaster.com',
    image: ticketmasterLogo,
    width: 80,
    height: 24,
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
    image: predictHQLogo,
    width: 80,
    height: 24,
    url: 'https://www.predicthq.com',
    
  },
  OpenMeteo: {
    name: 'OpenMeteo',
    label: 'Open-Meteo',
    image: openmeteoLogo,
    width:36,
    height:36,
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
  className?:string;
}

const SourceLogoDisplay = ({ source, className = 'opacity-60' }: SourceLogoDisplayProps) => {
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
            className={className}
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