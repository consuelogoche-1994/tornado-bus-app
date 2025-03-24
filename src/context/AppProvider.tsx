import { PassengersProvider } from './PassengersContext';
import { CityOriginProvider } from './CityOriginContext';
import { CityDestinityProvider } from './CityDestinityContext';
import { DepartureTravelProvider } from './DepartureTravelContext';
import { TripDetailsProvider } from './TripDetailsContext';
import { SeatsProvider } from './SeatsContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SeatsProvider>
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
    </SeatsProvider>
  );
};