import { createContext, useState, useEffect,ReactNode } from "react";
import { fetchCitiesByAlias } from "../api/cityOrigin";
import { City } from "../types/cities";

interface CityOriginContextType {
  cities: City[];
  fetchCities: (query: string) => void;
}

export const CityOriginContext = createContext<CityOriginContextType | undefined>(undefined);

export const CityOriginProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCitiesOrigin] = useState<City[]>([]);

  const fetchCities = async (query: string) => {
    if (query === "" || query.length >= 3) {
      const data = await fetchCitiesByAlias(query);
      setCitiesOrigin(data);
    }
  };
  
  // city for Default
  useEffect(() => {
    fetchCities("");
  }, []);

  return (
    <CityOriginContext.Provider value={{ cities, fetchCities }}>
      {children}
    </CityOriginContext.Provider>
  );
};