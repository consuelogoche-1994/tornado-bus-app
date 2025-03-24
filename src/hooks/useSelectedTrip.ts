import { useContext } from 'react';
import { SelectedTripContext } from '../context/SelectedTripContext';

export const useSelectedTrip = () => {
  const context = useContext(SelectedTripContext);
  if (!context) throw new Error('useSelectedTrip must be used within a SelectedTripProvider');
  return context;
};