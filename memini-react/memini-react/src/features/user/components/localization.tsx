import { useState, useEffect } from 'react';
import { Typography } from "@mui/material";

function LocationDisplay() {
  const [location, setLocation] = useState({ country: '', city: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setLocation({
          country: data.country_name,
          city: data.city
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to get location'); // Now this works
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading location...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Typography variant="subtitle2"> {location.city} , {location.country} </Typography>
  );
}

export default LocationDisplay;