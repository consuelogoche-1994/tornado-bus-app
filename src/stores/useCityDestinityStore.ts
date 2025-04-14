import { create } from 'zustand';
import { fetchCitiesDestinityByCity } from '@/api/cityDestiny';
import { City } from '@/types/cities';

interface CityDestinityState {
  citiesDestinity: City[];
  isLoading: boolean;
  fetchCitiesDestinity: (cityInitId: number, query: string) => Promise<void>;
}

export const useCityDestinityStore = create<CityDestinityState>((set) => {
  const fetchCitiesDestinity = async (cityInitId: number, query: string = '') => {
    console.log(cityInitId);
    console.log(query);
    // Return Early for short queries
    if (query !== "" && query.length < 3) return;

    set({ isLoading: true });

    try {
      const data = await fetchCitiesDestinityByCity(cityInitId, query);
      set({ citiesDestinity: data });
    } catch (error) {
      console.error('Error fetching cities destiny', error);
    } finally {
      set({ isLoading: false });
    }
  };

  return {
    citiesDestinity: [],
    isLoading: false,
    fetchCitiesDestinity,
  };
});