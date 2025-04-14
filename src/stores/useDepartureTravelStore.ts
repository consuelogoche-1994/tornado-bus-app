import { create } from 'zustand';
import { fetchDepartureTravelsByFilter } from '@/api/departureTravel';
import { DepartureTravel, DepartureTravelRequest } from '@/types/departureTravel';

interface DepartureTravelState {
  departureTravels: DepartureTravel[];
  isLoading: boolean;
  fetchDepartureTravels: (filters: DepartureTravelRequest) => Promise<void>;
}

export const useDepartureTravelStore = create<DepartureTravelState>((set) => {
  const fetchDepartureTravels = async (filters: DepartureTravelRequest) => {

    set({ isLoading: true });

    try {
      const data = await fetchDepartureTravelsByFilter(filters);
      set({ departureTravels: data?.data || [] });
    } catch (error) {
      console.error('Error fetching departure travels:', error);
    } finally {
      set({ isLoading: false });
    }
  };

  return {
    departureTravels: [],
    isLoading: false,
    fetchDepartureTravels,
  };
});