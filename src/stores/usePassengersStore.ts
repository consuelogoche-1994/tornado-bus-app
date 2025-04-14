import { create } from 'zustand';
import { PassengerType } from '@/types/passengerTypes';
import { fetchPassengerTypes } from '@/api/passengers';

interface PassengersState {
  passengerTypes: PassengerType[];
  isLoading: boolean;
  loadPassengerTypes: () => Promise<void>;
}

let hasFetched = false;

export const usePassengersStore = create<PassengersState>((set) => {
  const loadPassengerTypes = async () => {
    if (hasFetched) return;
    hasFetched = true;

    set({ isLoading: true });
    try {
      const data = await fetchPassengerTypes();
      set({ passengerTypes: data });
    } catch (error) {
      console.error('Error fetching passenger types', error);
    } finally {
      set({ isLoading: false });
    }
  };

  loadPassengerTypes();

  return {
    passengerTypes: [],
    isLoading: false,
    loadPassengerTypes,
  };
});