import apiClient from "./apiClient";
import { SeatResponse } from "../types/seats";

/**
 * Fetches the available seats for a specific trip.
 * @param travelId - Unique identifier of the trip.
 * @param cityInitId - Unique identifier of the origin city.
 * @param cityEndId - Unique identifier of the destination city.
 * @returns A promise resolving to the response containing seat levels and seat data.
 */
export const fetchAvailableSeats = async (
  travelId: number,
  cityInitId: number,
  cityEndId: number
): Promise<SeatResponse | null> => {
  try {
    const response = await apiClient.get<SeatResponse>(
      `/list/seats/${travelId}/${cityInitId}/${cityEndId}`
    );
    return response.data; // Ahora devuelve la estructura completa
  } catch (error) {
    console.error("Error fetching seats:", error);
    return null;
  }
};