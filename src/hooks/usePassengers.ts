import { useContext } from 'react';
import { PassengersContext } from '../context/PassengersContext';

export const usePassengers = () => {
  const context = useContext(PassengersContext);
  if (!context) throw new Error('usePassengers must be used within a PassengersProvider');
  return context;
};