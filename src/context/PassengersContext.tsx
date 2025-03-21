import { createContext, useState, useEffect, ReactNode } from 'react';
import { PassengerType } from '../types/passengerTypes';

import { fetchPassengerTypes } from '../api/passengers';

interface PassengersContextProps {
  passengerTypes: PassengerType[];
  reloadPassengerTypes: () => Promise<void>;
}

export const PassengersContext = createContext<PassengersContextProps | undefined>(undefined);

export const PassengersProvider = ({ children }: { children: ReactNode }) => {
  const [passengerTypes, setPassengerTypes] = useState<PassengerType[]>([]);

  const loadPassengerTypes = async () => {
    const data = await fetchPassengerTypes();
    setPassengerTypes(data);
  };

  useEffect(() => {
    loadPassengerTypes();
  }, []);

  return (
    <PassengersContext.Provider value={{ passengerTypes, reloadPassengerTypes: loadPassengerTypes }}>
      {children}
    </PassengersContext.Provider>
  );
};