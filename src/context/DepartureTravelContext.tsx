import { createContext, useState, ReactNode } from "react";
import { fetchDepartureTravelsByFilter } from "../api/departureTravel";
import { DepartureTravel, DepartureTravelRequest } from "../types/departureTravel";

interface DepartureTravelContextType {
  departureTravels: DepartureTravel[];
  fetchDepartureTravels: (filters: DepartureTravelRequest) => void;
}

export const DepartureTravelContext = createContext<DepartureTravelContextType | undefined>(undefined);

export const DepartureTravelProvider = ({ children }: { children: ReactNode }) => {
  const [departureTravels, setDepartureTravels] = useState<DepartureTravel[]>([]);

  const fetchDepartureTravels = async (filters: DepartureTravelRequest) => {
    try {
      const data = await fetchDepartureTravelsByFilter(filters);
      setDepartureTravels(data ? data.data : []);
    } catch (error) {
      console.error("Error fetching departure travels:", error);
    }
  };


  return (
    <DepartureTravelContext.Provider value={{ departureTravels, fetchDepartureTravels }}>
      {children}
    </DepartureTravelContext.Provider>
  );
};