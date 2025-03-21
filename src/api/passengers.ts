import apiClient from './apiClient';
import { PassengerType } from '../types/passengerTypes';


export const fetchPassengerTypes = async (): Promise<PassengerType[]> => {
  try {
    const response = await apiClient.get('/select/type');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching passenger types:', error);
    return [];
  }
};