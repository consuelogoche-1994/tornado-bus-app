import { createContext, useState, useEffect,ReactNode } from "react";
import { fetchCitiesOriginByAlias } from "../api/cityOrigin";
import { City } from "../types/cities";

interface CityOriginContextType {
  citiesOrigin: City[];
  fetchCitiesOrigin: (query: string) => void;
}

export const CityOriginContext = createContext<CityOriginContextType | undefined>(undefined);

export const CityOriginProvider = ({ children }: { children: ReactNode }) => {
  const [citiesOrigin, setCitiesOrigin] = useState<City[]>([]);

  const fetchCitiesOrigin = async (query: string) => {
    if (query === "" || query.length >= 3) {
      const data = await fetchCitiesOriginByAlias(query);
      setCitiesOrigin(data);
    }
  };
  
  // city for Default
  useEffect(() => {
    fetchCitiesOrigin("");
  }, []);

  return (
    <CityOriginContext.Provider value={{ citiesOrigin, fetchCitiesOrigin }}>
      {children}
    </CityOriginContext.Provider>
  );
};