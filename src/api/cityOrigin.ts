import apiClient from './apiClient';
import { City } from "../types/cities";

export const fetchCitiesOriginByAlias = async (value: string): Promise<City[]> => {
  try {
    const response = await apiClient.post("/select/origin", { value });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities by alias:", error);
    return [];
  }
};