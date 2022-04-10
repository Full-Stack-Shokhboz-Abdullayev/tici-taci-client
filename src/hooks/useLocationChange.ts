import { useEffect } from 'react';
import { Location, useLocation } from 'react-router-dom';

export const useLocationChange = (action: (current: Location) => void) => {
  const location = useLocation();
  useEffect(() => {
    action(location);
  }, [location]);
};
