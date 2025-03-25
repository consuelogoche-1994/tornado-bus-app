import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import Layout from "@/components/Layout"
import TripDetail from "@/components/TripDetail"
import BusSeatSelector from "@/components/BusSeatSelector";
import SeatIcon from "@/components/icons/seat";
import TripConfirmationModal from "@/components/TripConfirmationModal";
import TripSummary from "@/components/TripSummary"
import { Button } from "@/components/ui/button"
import { useSeats } from "@/hooks/useSeats";
import { useSelectedTrip } from "@/hooks/useSelectedTrip";
import { useTripDetails } from "@/hooks/useTripDetails";
import { Seat } from "@/types/seats"
import { toast } from "sonner";

function SeatSelection() {
  const navigate = useNavigate();
  const { seatLevels, isLoading } = useSeats();
  const { selectedTrip } = useSelectedTrip();
  const { tripDetail } = useTripDetails();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSeatSelection = (selectedSeats: Seat[]) => {
    setSelectedSeats(selectedSeats);
  };

  const handleOpenModal = () => {
    if (selectedSeats.length < tripDetail.passenger.total) {
      toast.error(`¡Casi listo! 😎 Solo faltan ${tripDetail.passenger.total - selectedSeats.length} asientos para completar tu selección. ¡Elige tus asientos y confirma tu viaje!`);
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="pt-16">
        <h1 className='text-2xl mb-6 mt-6'>Elige tus asientos</h1>
        {selectedTrip && <TripDetail departureTravel={selectedTrip} selectedTrip={true} onTripSelect={()=>{}} />}
        <div className="flex flex-col md:flex-row items-start gap-6 mt-6">
          <div className="flex-1 w-full bg-white rounded-md p-6">
            <div className="flex-1 gap-5 flex justify-around mb-4">
              <div className="flex items-center gap-3">
                <SeatIcon className="text-primary w-6 h-6" isAvailable={true}></SeatIcon>
                Disponible
              </div>
              <div className="flex items-center gap-3">
                <SeatIcon className="text-[#AECAFF] w-6 h-6" isAvailable={false}></SeatIcon>
                Ocupado
              </div>
              <div className="flex items-center gap-3">
                <SeatIcon className="text-primary w-6 h-6" isAvailable={false}></SeatIcon>
                Seleccionado
              </div>
            </div>
            <div className="flex-1 h-full">
              {
                isLoading ? (
                  <div className="flex justify-center gap-4 items-center h-full w-full">
                    <div className="w-7 h-7 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                    <div className='text-text'>Cargando ....</div>
                  </div>
                  ):
                  (<BusSeatSelector levels={seatLevels} maxSeats={tripDetail.passenger.total} onSeatSelect={handleSeatSelection} selectedSeats={selectedSeats}/>)
                }
            </div>
          </div>
          <div className="flex-1 w-full bg-white rounded-md p-6 flex flex-col gap-2">
            <TripSummary selectedSeats={selectedSeats}></TripSummary>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mt-10">
              <Button onClick={() => navigate("/trips")} variant="secondary" className="flex-1 w-full">Volver</Button>
              <Button  className="flex-1 w-full" onClick={handleOpenModal}>Reservar Viaje</Button>
              <TripConfirmationModal
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                selectedSeats={selectedSeats}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SeatSelection
