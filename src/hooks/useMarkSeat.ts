import { useContext } from 'react';
import { MarkSeatContext } from '../context/MarkSeatContext';

export const useMarkSeat = () => {
  const context = useContext(MarkSeatContext);
  if (!context) throw new Error('MarkSeatContext must be used within a MarkSeatsProvider');
  return context;
};