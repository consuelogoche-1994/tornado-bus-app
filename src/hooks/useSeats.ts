import { useContext } from 'react';
import { SeatsContext } from '../context/SeatsContext';

export const useSeats = () => {
  const context = useContext(SeatsContext);
  if (!context) throw new Error('SeatsContext must be used within a SeatsProvider');
  return context;
};