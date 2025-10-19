import { Box, Typography, Link, Chip } from '@mui/material';

export interface SourceAttribution {
  name: 'Ticketmaster' | 'FourSquare' | 'PredictHq' | 'OpenMeteo' | 'TheNews';
  label: string;
  url: string;
  logoUrl?: string;
}

const sourceConfig: Record<string, SourceAttribution> = {
  Ticketmaster: {
    name: 'Ticketmaster',
    label: 'Ticketmaster',
    url: 'https://www.ticketmaster.com',
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ticketmaster.svg',
  },
  FourSquare: {
    name: 'FourSquare',
    label: 'Foursquare',
    url: 'https://foursquare.com',
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/foursquare.svg',
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
  console.log(source);
  return (
    <Link 
      href={sourceConfig[source].url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 no-underline"
    >
      {sourceConfig[source].logoUrl ? (
        <>
          <img 
            src={sourceConfig[source].logoUrl} 
            alt={sourceConfig[source].label}
            className="w-16 h-16 opacity-60"
            style={{ filter: 'grayscale(100%)' }}
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