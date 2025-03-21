import { PassengersProvider } from './PassengersContext';
import { CityOriginProvider } from './CityOriginContext';
import { CityDestinityProvider } from './CityDestinityContext';
import { DepartureTravelProvider } from './DepartureTravelContext';
import { TripDetailsProvider } from './TripDetailsContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DepartureTravelProvider>
      <CityDestinityProvider>
        <CityOriginProvider>
        <PassengersProvider>
            <TripDetailsProvider>
              {children}
            </TripDetailsProvider>
          </PassengersProvider>
        </CityOriginProvider>
      </CityDestinityProvider>
    </DepartureTravelProvider>
  );
};