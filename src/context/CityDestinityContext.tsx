import { createContext, useState, ReactNode } from "react";
import { fetchCitiesDestinityByCity } from "../api/cityDestiny";
import { City } from "../types/cities";

interface CityDestinityContextType {
  citiesDestinity: City[];
  fetchCitiesDestinity: (cityInitId: number, query: string) => void;
}

export const CityDestinityContext = createContext<CityDestinityContextType | undefined>(undefined);

export const CityDestinityProvider = ({ children }: { children: ReactNode }) => {
  const [citiesDestinity, setCityDestinity] = useState<City[]>([]);

  const fetchCitiesDestinity = async (cityInitId: number, query: string) => {
    if (query === "" || query.length >= 3) {
      const data = await fetchCitiesDestinityByCity(cityInitId, query);
      setCityDestinity(data);
    }
  };


  return (
    <CityDestinityContext.Provider value={{ citiesDestinity, fetchCitiesDestinity }}>
      {children}
    </CityDestinityContext.Provider>
  );
};