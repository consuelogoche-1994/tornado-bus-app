// api/markSeat.ts

import apiClient from './apiClient';
import { MarkSeatRequest, MarkSeat } from '../types/markSeats';

/**
 * Marks a seat as selected for a specific tripl.
 * @param params - Parameters required to mark the seat.
 * @returns A promise resolving to the response data containing ticket and busSketch.
 */
export const markSeat = async (params: MarkSeatRequest): Promise<MarkSeat | null> => {
  try {
    const response = await apiClient.put('/list/seats/mark', params);
    return response.data.data;
  } catch (error) {
    console.error('Error marking the seat:', error);
    return null;
  }
};