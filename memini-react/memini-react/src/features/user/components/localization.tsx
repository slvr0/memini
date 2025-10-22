import { useState, useEffect } from 'react';
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { IPositionState } from '@/interfaces/common-interfaces'; // WHY DOES @ IMPORT WORK HERE???WTF
import { ApiResponse } from '@/interfaces/api-response'; 
import { positionActions } from '../../../store/position-store';
import { setUserLocationApi, getUserLocationApi } from '../store/user-api';
import { Plug, ChevronUp, ChevronDown, Slash, ChevronsUpDown, Globe, Globe2, Boxes, Combine } from 'lucide-react';

function LocationDisplay() {
  const [location, setLocation] = useState<IPositionState>({ Country: '', City: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getLocationFromUserLocation = async () : Promise<boolean>  =>  {   
    const response : ApiResponse<IPositionState> = await getUserLocationApi();
    if(response && response.Success && response.ResponseObject.City && response.ResponseObject.Country) {
      setLocation(response.ResponseObject);
      dispatch(positionActions.setPosition({
        Country: response.ResponseObject.Country,
        City: response.ResponseObject.City
      }));
      
      return true;
    } 
    else 
      return false;
  }
  
  const updateLocationFromIPService = async (): Promise<void> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const location: IPositionState = {
        Country: data.country_name,
        City: data.city
      }; 
      
      setLocation(location);
      dispatch(positionActions.setPosition(location));
      await setUserLocationApi(location);

      setLoading(false);
    } catch (error) {
      setError('Failed to get location');
      setLoading(false);
    }
  };

  useEffect(() => {
  const initializeLocation = async () => {
    const locationFound = await getLocationFromUserLocation();   
    if (!locationFound) {   
      await updateLocationFromIPService();
    } else {
      setLoading(false); // Don't forget to set loading to false if location was found
    }
  };

  initializeLocation();
}, []);

  if (loading) return <p>Loading location...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>    
    <Globe size={14}  style={{color:"#6ce699", opacity:0.75}} />
    <Typography variant="subtitle2"> {location.City} , {location.Country} </Typography>
    </>
  );
}

export default LocationDisplay;