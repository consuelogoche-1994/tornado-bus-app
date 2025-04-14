import { create } from 'zustand';
import { fetchCitiesOriginByAlias } from '@/api/cityOrigin';
import { City } from '@/types/cities';

interface CityOriginState {
  citiesOrigin: City[];
  isLoading: boolean;
  fetchCitiesOrigin: (query?: string) => Promise<void>;
}

let hasFetched = false;

export const useCityOriginStore = create<CityOriginState>((set) => {
  const fetchCitiesOrigin = async (query: string = '') => {
    // Return Early to prevent repeated default fetch
    if (hasFetched && query === '') return;
    // Return Early for short queries
    if (query !== '' && query.length < 3) return;

    if (query === '') hasFetched = true;

    set({ isLoading: true });
    try {
      const data = await fetchCitiesOriginByAlias(query);
      set({ citiesOrigin: data });
    } catch (error) {
      console.error('Error fetching city origins', error);
    } finally {
      set({ isLoading: false });
    }
  };

  // Fetch default data
  fetchCitiesOrigin();

  return {
    citiesOrigin: [],
    isLoading: false,
    fetchCitiesOrigin,
  };
});