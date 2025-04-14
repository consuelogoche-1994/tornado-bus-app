import { useTripDetailsStore } from '@/stores/useTripDetailsStore';
import { useSelectedTripStore } from '@/stores/useSelectedTripStore';
import { Seat } from "@/types/seats";


interface TripSummaryProps {
    selectedSeats: Seat[],
}

const TripSummary = ({ selectedSeats }: TripSummaryProps ) => {
const { tripDetail } = useTripDetailsStore();
const { selectedTrip } = useSelectedTripStore();

return (
<div className="w-full flex flex-col gap-2">
    <h2 className='text-lg text-primary mb-4'>Detalle de compra</h2>
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
</div>
)
}

export default TripSummary