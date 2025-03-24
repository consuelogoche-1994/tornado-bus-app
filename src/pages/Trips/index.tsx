import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout'
import TripDetail from '@/components/TripDetail';
import { useSelectedTrip } from "@/hooks/useSelectedTrip";
import { useSeats } from "@/hooks/useSeats";
import { DepartureTravel } from "@/types/departureTravel";
import { useDepartureTravel } from "@/hooks/useDepartureTravel";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

function Trips() {
  const navigate = useNavigate();
  const { departureTravels, isLoading } = useDepartureTravel();
  const { fetchSeats } = useSeats();
  const { setSelectedTrip } = useSelectedTrip();

  const handleTripSelection = (selectedTrip:DepartureTravel ) => {
    setSelectedTrip(selectedTrip);
    fetchSeats(selectedTrip.id, selectedTrip.cityInitID, selectedTrip.cityEndID);
    navigate("/seat-selection");
  };

  return (
    <Layout showBanner={true}>
      <div className='mt-6'>
        <h1 className='text-2xl mb-6'>Elige un viaje disponible</h1>
        <div>
        {!isLoading  ? (
          departureTravels.length ? (
            <div className="w-full flex flex-col gap-4">
              {departureTravels.map((departureTravel, index) => (
                <TripDetail departureTravel={departureTravel} selectedTrip={false} onTripSelect={handleTripSelection} key={index} />
              ))}
            </div>)
            :(
              <div className="w-full h-40">
                <div className='flex flex-row w-full h-full gap-2 items-center justify-center'>
                  <FaceFrownIcon className="h-8 w-8 text-text"/>
                  <div className='text-text text-xl'>No se encontraron viajes disponibles</div>
                </div>
              </div>
            )
        ) : (
          <div className="w-full h-40">
            <div className='flex flex-row w-full h-full gap-4 items-center justify-center'>
              <div className="w-7 h-7 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
              <div className='text-text'>Cargando ....</div>
            </div>
          </div>
        )}
        </div>
      </div>
    </Layout>
  )
}

export default Trips