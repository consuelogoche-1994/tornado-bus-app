import apiClient from './apiClient';
import { City } from "../types/cities";

/**
 * Fetches a list of destination cities based on the initial city ID and search value.
 * @param cityInitId - The ID of the initial city.
 * @param value - The search value for the destination.
 * @returns A promise resolving to an array of destinations.
 */
export const fetchCitiesDestinityByCity = async (cityInitId: number, value: string): Promise<City[]> => {
  try {
    const response = await apiClient.post(`/select/destiny/${cityInitId}`, { value });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
};