import { createContext, useState, ReactNode } from "react";
import { fetchAvailableSeats } from "../api/seats";
import { SeatLevel } from "../types/seats";

interface SeatsContextType {
  seatLevels: SeatLevel[];
  isLoading: boolean;
  fetchSeats: (travelId: number, cityInitId: number, cityEndId: number) => void;
}

export const SeatsContext = createContext<SeatsContextType | undefined>(undefined);

export const SeatsProvider = ({ children }: { children: ReactNode }) => {
  const [seatLevels, setSeatLevels] = useState<SeatLevel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchSeats = async (travelId: number, cityInitId: number, cityEndId: number) => {
    try {
      setIsLoading(true);
      const data = await fetchAvailableSeats(travelId, cityInitId, cityEndId);
      setSeatLevels(data ? data.data : []);
    } catch (error) {
      console.error("Error fetching available seats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SeatsContext.Provider value={{ seatLevels, isLoading, fetchSeats }}>
      {children}
    </SeatsContext.Provider>
  );
};