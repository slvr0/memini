import React from 'react';
import logo2 from "../../../assets/images/memini-png.png";
import { useNavigate, useLocation } from "react-router-dom";
import foursquareLogo from "../../../assets/images/foursquare.png";
import ticketmasterLogo from "../../../assets/images/ticketmaster.svg";
import predictHQLogo from "../../../assets/images/predict-hq-cropped.svg"
import openmeteoLogo from "../../../assets/images/open-meteo.png"

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  CalendarMonth,
  Explore,
  ArrowForward,
  Speed,
  Groups,
  AutoAwesome,
} from '@mui/icons-material';



const HomePage = () => {
  const navigate = useNavigate();
  // Duplicate logos for seamless scroll effect
  const logos = ['FourSquare', 'Ticketmaster', 'PredictHq', 'SeatGeek', 'The News Api', 'Open Meteo'];
  const allLogos = [...logos, ...logos];

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        maxHeight: '100vh',
        overflowY: 'none',
      }}
    >
      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 6, md: 10 },overflowX: 'hidden',
        }}
      >
        {/* Logo/Brand Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
                   
            <Box
              component="img"
              src={logo2}
              alt="App Icon"
              sx={{
               width: 80,
              height: 80,
              borderRadius: '20px',
             overflowX: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 3,         
              }}
            >
          </Box>
     
        </Box>

        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 10, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="h2" fontWeight={400} fontSize={36}>
            Discover events.
            <br />
            Plan your time.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#6b7280',
              mb: 4,
              lineHeight: 1.7,
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Your all-in-one platform for finding the perfect events and organizing
            your schedule with intelligent planning tools.
          </Typography>

          {/* Feature Pills */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mb: 5,
            }}
          >
            <Chip
              icon={<Speed sx={{ fontSize: 18 }} />}
              label="Lightning fast"
              sx={{
                bgcolor: '#f3f4f6',
                color: '#374151',
                fontWeight: 500,
                '& .MuiChip-icon': { color: '#6b7280' },
              }}
            />
            <Chip
              icon={<Groups sx={{ fontSize: 18 }} />}
              label="Social integration"
              sx={{
                bgcolor: '#f3f4f6',
                color: '#374151',
                fontWeight: 500,
                '& .MuiChip-icon': { color: '#6b7280' },
              }}
            />
            <Chip
              icon={<AutoAwesome sx={{ fontSize: 18 }} />}
              label="Smart recommendations"
              sx={{
                bgcolor: '#f3f4f6',
                color: '#374151',
                fontWeight: 500,
                '& .MuiChip-icon': { color: '#6b7280' },
              }}
            />
          </Box>
        </Box>

        {/* Main Action Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent 70%)',
                  pointerEvents: 'none',
                },
              }}
            >
              <CardActionArea
              onClick={() => {navigate('/planning')}}
                sx={{
                  height: '100%',
                  minHeight: 320,
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Explore
                    sx={{
                      fontSize: 48,
                      mb: 3,
                      opacity: 0.9,
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    Discover Events
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.95,
                      lineHeight: 1.7,
                      mb: 3,
                    }}
                  >
                    Browse curated events tailored to your interests. From concerts
                    and workshops to networking events and festivals.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    color: '#fff',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                  
                >
                  Start Exploring
                </Button>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: '#fff',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent 70%)',
                  pointerEvents: 'none',
                },
              }}
            >
              <CardActionArea
              onClick={() => {navigate('/events')}}
                sx={{
                  height: '100%',
                  minHeight: 320,
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <CalendarMonth
                    sx={{
                      fontSize: 48,
                      mb: 3,
                      opacity: 0.9,
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    Planning Schedule
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.95,
                      lineHeight: 1.7,
                      mb: 3,
                    }}
                  >
                    Organize your time with intelligent scheduling. Automatic conflict
                    detection, reminders, and seamless calendar integration.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    color: '#fff',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  Manage Schedule
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

      
      </Container>

      {/* Logo Marquee Section */}
      
        <Container maxWidth="lg">
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              fontSize: '0.75rem',
              mb: 4,
              fontWeight: 600,
            }}
          >
            Powered by open source
          </Typography>

          {/* Scrolling Logo Container */}
          <Box
            sx={{
              display: 'flex',
              gap: 8,
              animation: 'scroll 20s linear infinite',
              '@keyframes scroll': {
                '0%': {
                  transform: 'translateX(0)',
                },
                '100%': {
                  transform: 'translateX(-50%)',
                },
              },
              '&:hover': {
                animationPlayState: 'paused',
              },
            }}
          >
            {allLogos.map((logo, index) => (

                
              <Box
                key={index}
                sx={{
                  minWidth: 140,
                  height: 60,
                  display: 'flex',
                  overflowX: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'grayscale(100%)',
                  opacity: 0.5,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                {/* Replace with actual logo images:
                <img 
                  src={`/logos/${logo.toLowerCase().replace(' ', '-')}.png`}
                  alt={logo}
                  style={{ maxHeight: '32px', maxWidth: '100%', objectFit: 'contain' }}
                />
                */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#1a1a1a',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {logo}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
     
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#9ca3af',
            fontSize: '0.875rem',
          }}
        >
          © 2025 Memini · Made with passion
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;