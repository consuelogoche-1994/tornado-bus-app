import { create } from 'zustand';
import { fetchCitiesOriginByAlias } from '@/api/cityOrigin';
import { City } from '@/types/cities';

interface CityOriginState {
  citiesOrigin: City[];
  isLoading: boolean;
  fetchCitiesOrigin: (query?: string) => Promise<void>;
}

const MIN_QUERY_LENGTH = 3;
const DEFAULT_QUERY_VALUE = '';
const SHOULD_NOT_FILTER_QUERY = (query: string) => query !== DEFAULT_QUERY_VALUE && query.length < MIN_QUERY_LENGTH;

let hasFetched = false;

export const useCityOriginStore = create<CityOriginState>((set) => {
  const fetchCitiesOrigin = async (query: string = '') => {
    // Return Early to prevent repeated default fetch
    if (hasFetched && query === DEFAULT_QUERY_VALUE) return;
    // Return Early for short queries
    if (SHOULD_NOT_FILTER_QUERY(query)) return;

    if (query === DEFAULT_QUERY_VALUE) hasFetched = true;

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