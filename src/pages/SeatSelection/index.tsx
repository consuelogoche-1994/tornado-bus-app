import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import Layout from "@/components/Layout"
import TripDetail from "@/components/TripDetail"
import BusSeatSelector from "@/components/BusSeatSelector";
import SeatIcon from "@/components/icons/seat";
import { Button } from "@/components/ui/button"
import { useSeats } from "@/hooks/useSeats";
import { useSelectedTrip } from "@/hooks/useSelectedTrip";
import { useTripDetails } from "@/hooks/useTripDetails";
import { Seat } from "@/types/seats"

function SeatSelection() {
  const navigate = useNavigate();
  const { seatLevels, isLoading } = useSeats();
  const { selectedTrip } = useSelectedTrip();
  const { tripDetail } = useTripDetails();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSeatSelection = (selectedSeats: Seat[]) => {
    setSelectedSeats(selectedSeats);
  };

  return (
    <Layout>
      <div className="pt-16">
        <h1 className='text-2xl mb-6 mt-6'>Elige tus asientos</h1>
        {selectedTrip && <TripDetail departureTravel={selectedTrip} selectedTrip={true} onTripSelect={()=>{}} />}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
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
            <h2 className='text-xl text-primary mb-4'>Detalle de compra</h2>
            <p className="font-semibold">{selectedTrip?.cityInit} - {selectedTrip?.cityEnd}</p>
            <p>{selectedTrip?.dateInitFormat} - {selectedTrip?.dateInitFormat}</p>
            <p>{selectedTrip?.HourInitFormat} - {selectedTrip?.HourEndFormat}</p>
            <p>Asientos :</p>
            <div className='flex gap-2 flex-col'>
              {[...Array(tripDetail.passenger.total)].map((_, index) => (
                <div key={index} className="flex justify-between gap-2 bg-accent p-1 rounded-md">
                  <div>Pasajero {index + 1}</div>
                  <div>Asiento N° {selectedSeats[index]?.seat ?? "-"}</div>
                </div>
              ))}
            </div>
            <hr className="my-2 border-gray-300" />
            <p>Cantidad de pasajeros: {tripDetail.passenger.total}</p>
            <p>Precio por persona: {selectedTrip?.amount} {selectedTrip?.currency}</p>
            <div className="flex justify-between items-start">
              <p>Total: </p>
              <p className="text-xl bg-accent p-2 rounded-xl">
                {tripDetail.passenger.total * Number(selectedTrip?.amount ?? 0)} {selectedTrip?.currency}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mt-10">
              <Button onClick={() => navigate("/trips")} variant="secondary" className="flex-1 w-full">Volver</Button>
              <Button className="flex-1 w-full">Confirmar</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SeatSelection
