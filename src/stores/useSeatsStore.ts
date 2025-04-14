import { create } from 'zustand';
import { fetchAvailableSeats } from '@/api/seats';
import { SeatLevel } from '@/types/seats';

interface SeatsState {
  seatLevels: SeatLevel[];
  isLoading: boolean;
  fetchSeats: (travelId: number, cityInitId: number, cityEndId: number) => Promise<void>;
}

export const useSeatsStore = create<SeatsState>((set) => {
  const fetchSeats = async (travelId: number, cityInitId: number, cityEndId: number) => {
    set({ isLoading: true });

    try {
      const data = await fetchAvailableSeats(travelId, cityInitId, cityEndId);
      set({ seatLevels: data?.data || [] });
    } catch (error) {
      console.error('Error fetching available seats:', error);
    } finally {
      set({ isLoading: false });
    }
  };

  return {
    seatLevels: [],
    isLoading: false,
    fetchSeats,
  };
});