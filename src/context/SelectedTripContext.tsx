import { createContext, useState,ReactNode } from 'react';
import { DepartureTravel } from '../types/departureTravel';

interface SelectedTripContextProps {
  selectedTrip: DepartureTravel | undefined;
  setSelectedTrip: React.Dispatch<React.SetStateAction<DepartureTravel | undefined>>;
}

export const SelectedTripContext = createContext<SelectedTripContextProps | undefined>(undefined);

export const SelectedTripProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTrip, setSelectedTrip] = useState<DepartureTravel | undefined>();

  return (
    <SelectedTripContext.Provider value={{ selectedTrip, setSelectedTrip }}>
      {children}
    </SelectedTripContext.Provider>
  );
};