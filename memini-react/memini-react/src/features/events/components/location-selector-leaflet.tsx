import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { positionActions } from '../../../store/position-store' // Adjust path
import { Earth } from 'lucide-react';
import MuiStyledButton from '../../../mui-wrappers/mui-button-wrapper'
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box } from '@mui/material';
import { Close } from '@mui/icons-material';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import LucidIconButton from "../../../lucid/lucid-button-icon";
import { RootState } from '@/store';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Types
interface City {
  name: string;
  lat: number;
  lng: number;
}

const swedishCities: City[] = [
  { name: 'Stockholm', lat: 59.3293, lng: 18.0686 },
  { name: 'Göteborg', lat: 57.7089, lng: 11.9746 },
  { name: 'Malmö', lat: 55.6050, lng: 13.0038 },
  { name: 'Uppsala', lat: 59.8586, lng: 17.6389 },
  { name: 'Örebro', lat: 59.2753, lng: 15.2134 },
  { name: 'Västerås', lat: 59.6099, lng: 16.5448 },
  { name: 'Linköping', lat: 58.4108, lng: 15.6214 },
  { name: 'Helsingborg', lat: 56.0465, lng: 12.6945 },
  { name: 'Jönköping', lat: 57.7826, lng: 14.1618 },
  { name: 'Norrköping', lat: 58.5877, lng: 16.1924 },
  { name: 'Lund', lat: 55.7047, lng: 13.1910 },
  { name: 'Umeå', lat: 63.8258, lng: 20.2630 },
  { name: 'Gävle', lat: 60.6749, lng: 17.1413 },
  { name: 'Borås', lat: 57.7210, lng: 12.9401 }
];

const LocationSelector: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tempSelectedCity, setTempSelectedCity] = useState<City | null>(null);
  const dispatch = useDispatch(); 
  const userLocation = useSelector((state: RootState) => state.location); 

  const cityIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTempSelectedCity(null);
  };

  const handleCityClick = (city: City): void => {
    setTempSelectedCity(city);
  };

  const handleConfirmLocation = () => {
    if (tempSelectedCity) {
      dispatch(positionActions.setPosition({ 
        Country: 'Sweden',
        City: tempSelectedCity.name,
        CountryCode: 'SE'
      }));
      handleCloseModal();
    }
  };

  return (
    <>
      {/* Location Button and Display */}
      <Box className="flex items-center gap-2">
        <LucidIconButton
          icon={Earth}
          className="p-2 !text-miTheme !border-miTheme"
          size={20}
          opacity={.75}
          palette="main"
          borderProfile="semiStraight"
          highlightBackgroundOnHover={true}
          highlightBorderOnHover={true}
          displayBorder={true}
          tooltip="Change location"
          onClick={handleOpenModal}
        />
        <Typography variant="h6" fontSize={18}>
          {userLocation.City}, {userLocation.Country}
        </Typography>
      </Box>

      {/* Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: '80vw',
            height: '80vh',
            maxWidth: '80vw',
            maxHeight: '80vh',
            m: 0
          }
        }}
      >
        {/* Header */}
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" component="div" fontSize={20}>
            Select Your City
          </Typography>
          <IconButton onClick={handleCloseModal} edge="end">
            <Close />
          </IconButton>
        </DialogTitle>

        {/* Map Content */}
        <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
          <MapContainer 
            center={[62, 15]}
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            
            {swedishCities.map((city) => (
              <Marker
                key={city.name}
                position={[city.lat, city.lng]}
                icon={cityIcon}
                eventHandlers={{
                  click: () => handleCityClick(city),
                }}
              >
                <Popup>
                  <div className="text-center">
                    <strong className="text-lg">{city.name}</strong>
                    <p className="text-sm text-gray-600">Click to select</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Selected City Info & Confirm Button */}
          {tempSelectedCity && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'flex-end'
              }}
            >
              {/* City Info Card */}
              <Box
                sx={{
                  backgroundColor: 'white',
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  minWidth: '200px'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Selected City
                </Typography>
                <Typography variant="h6" color="primary">
                  {tempSelectedCity.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {tempSelectedCity.lat.toFixed(4)}, {tempSelectedCity.lng.toFixed(4)}
                </Typography>
              </Box>

              {/* Confirm Button */}
              <MuiStyledButton
                buttonSize="md"
                borderType="rounded"
                highlightBackgroundOnHover={true}
                highlightBorderOnHover={true}
                buttonVariant="meminiThemeOutline"
                onClick={handleConfirmLocation}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  🗺️ Discover {tempSelectedCity.name}
                </Typography>
              </MuiStyledButton>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationSelector;