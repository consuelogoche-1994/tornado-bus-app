import { PassengersProvider } from './PassengersContext';
import { CityOriginProvider } from './CityOriginContext';
import { CityDestinityProvider } from './CityDestinityContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CityDestinityProvider>
      <CityOriginProvider>
        <PassengersProvider>
          {children}
        </PassengersProvider>
      </CityOriginProvider>
    </CityDestinityProvider>
  );
};