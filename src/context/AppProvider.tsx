import { PassengersProvider } from './PassengersContext';
import { CityOriginProvider } from './CityOriginContext';
import { CityDestinityProvider } from './CityDestinityContext';
import { DepartureTravelProvider } from './DepartureTravelContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DepartureTravelProvider>
      <CityDestinityProvider>
        <CityOriginProvider>
          <PassengersProvider>
            {children}
          </PassengersProvider>
        </CityOriginProvider>
      </CityDestinityProvider>
    </DepartureTravelProvider>
  );
};