import apiClient from './apiClient';
import { City } from "../types/cities";

export const fetchCitiesByAlias = async (value: string): Promise<City[]> => {
  try {
    const response = await apiClient.post("/select/origin", { value });
    return response.data.data; // Asegúrate de que la API devuelve los datos en `data.data`
  } catch (error) {
    console.error("Error fetching cities by alias:", error);
    return [];
  }
};