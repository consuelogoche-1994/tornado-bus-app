import { PassengersProvider } from './PassengersContext';
import { CityOriginProvider } from './CityOriginContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CityOriginProvider>
      <PassengersProvider>
        {children}
      </PassengersProvider>
    </CityOriginProvider>
  );
};