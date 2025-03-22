import { createContext, useState,ReactNode } from 'react';
import { TripDetail } from '../types/tripDetails';

interface TripDetailsContextProps {
  tripDetail: TripDetail;
  setTripDetail: React.Dispatch<React.SetStateAction<TripDetail>>;
}

export const TripDetailsContext = createContext<TripDetailsContextProps | undefined>(undefined);

export const TripDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [tripDetail, setTripDetail] = useState<TripDetail>({
    passenger: {
      adulto: 1,
      niño: 0,
      senior: 0,
      total: 1,
    },
    cityInitID: null,
    cityEndID: null,
    date: null,
  });

  return (
    <TripDetailsContext.Provider value={{ tripDetail, setTripDetail }}>
      {children}
    </TripDetailsContext.Provider>
  );
};