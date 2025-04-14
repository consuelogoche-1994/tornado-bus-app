import { create } from 'zustand';
import { TripDetail } from '@/types/tripDetails';

interface TripDetailsState {
  tripDetail: TripDetail;
  setTripDetail: (detail: TripDetail) => void;
}

export const useTripDetailsStore = create<TripDetailsState>((set) => {
  const setTripDetail = (detail: TripDetail) => {
    set({ tripDetail: detail });
  };

  return {
    tripDetail: {
      passengersCount:  [],
      totalPassengers: 1,
      cityInitID: null,
      cityEndID: null,
      date: null,
    },
    setTripDetail,
  };
});