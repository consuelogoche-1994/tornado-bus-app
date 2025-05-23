import { create } from 'zustand';
import { fetchCitiesDestinityByCity } from '@/api/cityDestiny';
import { City } from '@/types/cities';

interface CityDestinityState {
  citiesDestinity: City[];
  isLoading: boolean;
  fetchCitiesDestinity: (cityInitId: number, query: string) => Promise<void>;
}

const MIN_QUERY_LENGTH = 3;
const DEFAULT_QUERY_VALUE = "";
const SHOULD_NOT_FILTER_QUERY = (query: string) => query !== DEFAULT_QUERY_VALUE && query.length < MIN_QUERY_LENGTH;

export const useCityDestinityStore = create<CityDestinityState>((set) => {
  const fetchCitiesDestinity = async (cityInitId: number, query: string = '') => {
    if (SHOULD_NOT_FILTER_QUERY(query)) return;
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