import { useContext } from 'react';
import { TripDetailsContext } from '../context/TripDetailsContext';

export const useTripDetails = () => {
  const context = useContext(TripDetailsContext);
  if (!context) throw new Error('useTripDetails must be used within a TripDetailsProvider');
  return context;
};