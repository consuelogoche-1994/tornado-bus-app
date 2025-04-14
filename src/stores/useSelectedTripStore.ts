import { create } from 'zustand';
import { DepartureTravel } from '@/types/departureTravel';

interface SelectedTripState {
  selectedTrip: DepartureTravel | undefined;
  setSelectedTrip: (trip: DepartureTravel | undefined) => void;
}

export const useSelectedTripStore = create<SelectedTripState>((set) => {
  const setSelectedTrip = (trip: DepartureTravel | undefined) => {
    set({ selectedTrip: trip });
  };

  return {
    selectedTrip: undefined,
    setSelectedTrip,
  };
});