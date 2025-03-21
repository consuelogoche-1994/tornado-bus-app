import { useContext } from 'react';
import { DepartureTravelContext } from '../context/DepartureTravelContext';

export const useDepartureTravel = () => {
  const context = useContext(DepartureTravelContext);
  if (!context) throw new Error('useDepartureTravel must be used within a DepartureTravelProvider');
  return context;
};