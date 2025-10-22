import React from 'react';
import { Box, Typography } from '@mui/material';
import { Air } from '@mui/icons-material';

interface WeatherInfo {
  WeatherInfoKey: number;
  CoreNodeKey: number;
  TemperatureMax?: number;
  TemperatureMin?: number;
  PrecipitationSum?: number;
  WeatherDescription?: string;
  WindspeedMax?: number;
  WindDirection?: string;
}

interface CoreNode {
  StartDate: string;
  WeatherInfo: WeatherInfo;
}

interface WeatherWidgetProps {
  nodes: CoreNode[];
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ nodes }) => {
  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getWeatherIcon = (description?: string) => {
    if (!description) return '—';
    const lower = description.toLowerCase();
    if (lower.includes('sun') || lower.includes('clear')) return '☀️';
    if (lower.includes('cloud')) return '☁️';
    if (lower.includes('rain')) return '🌧️';
    if (lower.includes('snow')) return '❄️';
    if (lower.includes('storm')) return '⛈️';
    return '☁️';
  };

  if (nodes.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', py: 1, backgroundColor: '#fafafa' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          px: 2,
          overflowX: 'auto',
          height: '100%',
          '&::-webkit-scrollbar': {
            height: 4,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ddd',
            borderRadius: 2,
            '&:hover': {
              background: '#bbb',
            },
          },
        }}
      >
        {nodes.map((node) => {
          const weather = node.WeatherInfo;
          return (
            <Box
              key={node.WeatherInfo.WeatherInfoKey}
              sx={{
                flex: 1,
                minWidth: 50,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
              }}
            >
              {/* Date Row */}
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 0.5,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                  }}
                >
                  {formatDay(node.StartDate)}
                </Typography>
              </Box>

              {/* Info Row */}
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 0.5,
                  flex: 1,
                  minHeight: 48,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  py: 0.5,
                }}
              >
                {/* Temperature Min */}
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    fontWeight: 500,
                    fontSize: '0.65rem',
                    lineHeight: 1,
                  }}
                >
                  {weather.TemperatureMin !== undefined
                    ? `${Math.round(weather.TemperatureMin)}°`
                    : '—'}
                </Typography>

                {/* Temperature Max */}
                <Typography
                  variant="caption"
                  sx={{
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    lineHeight: 1,
                  }}
                >
                  {weather.TemperatureMax !== undefined
                    ? `${Math.round(weather.TemperatureMax)}°`
                    : '—'}
                </Typography>

                {/* Weather Icon/Description */}
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1,
                  }}
                >
                  {getWeatherIcon(weather.WeatherDescription)}
                </Typography>

                {/* Wind Speed with Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <Air sx={{ fontSize: 10, color: '#999' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#666',
                      fontSize: '0.6rem',
                      lineHeight: 1,
                    }}
                  >
                    {weather.WindspeedMax !== undefined
                      ? `${Math.round(weather.WindspeedMax)}`
                      : '—'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WeatherWidget;