import { PassengersProvider } from './PassengersContext';
import { CityOriginProvider } from './CityOriginContext';
import { CityDestinityProvider } from './CityDestinityContext';
import { DepartureTravelProvider } from './DepartureTravelContext';
import { TripDetailsProvider } from './TripDetailsContext';
import { SeatsProvider } from './SeatsContext';
import { SelectedTripProvider } from './SelectedTripContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SelectedTripProvider>
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
    </ SelectedTripProvider>
  );
};