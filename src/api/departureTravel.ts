import apiClient from './apiClient';
import { DepartureTravelRequest, DepartureTravel } from '../types/departureTravel';

/**
 * Fetches a list of available departure travels with filters and pagination.
 * @param params - Parameters for pagination and filters.
 * @returns A promise resolving to the list of travels.
 */
export const fetchDepartureTravelsByFilter = async (params: DepartureTravelRequest): Promise<{ data: DepartureTravel[] } | null> => {
  try {
    const response = await apiClient.post('/list/departure-travels', params, {
      params: {
        isMultiRoute: true,
        isReturn: false
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching departure travels:', error);
    return null;
  }
};