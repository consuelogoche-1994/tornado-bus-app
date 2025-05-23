import { Button } from "@/components/ui/button"
import { DepartureTravel } from "@/types/departureTravel";

interface tripDetailProps {
    departureTravel: DepartureTravel
    selectedTrip: Boolean;
    onTripSelect: (tripSelected: DepartureTravel) => void;
}
const TripDetail = ({departureTravel, selectedTrip = false, onTripSelect }: tripDetailProps) => {
  return (
    <div className="w-full bg-white rounded-md p-3 grid grid-cols-6">
        <div className='col-span-4 md:grid md:grid-cols-3 gap-2'>
            <div className='col-span-1'>
                <p className='text-primary font-semibold'>Origen</p>
                <div className='text-sm font-light'>{departureTravel.dateInitFormat}</div>
                <div className='text-2xl text-primary'>{departureTravel.HourInitFormat}</div>
                <div className='text-sm font-light text-gray-500'>{departureTravel.cityInit}</div>
            </div>

            <div className='col-span-1 w-full'>
                <div className='text-xl font-light text-center'>{departureTravel.travelTime}</div>
                <div className="visible border-t border-gray-400 mx-4"></div>
            </div>

            <div className='col-span-1'>
                <p className='text-primary font-semibold'>Destino</p>
                <div className='text-sm font-light'>{departureTravel.dateEndFormat}</div>
                <div className='text-2xl text-primary '>{departureTravel.HourEndFormat}</div>
                <div className='text-sm font-light text-gray-500'>{departureTravel.cityEnd}</div>
            </div>
        </div>
        <div className='col-span-2 flex flex-col items-center justify-center'>
            <div className='text-sm font-light text-gray-500'>Precio por pasajero</div>
            <div className='text-2xl mb-2'>{departureTravel.amount} {departureTravel.currency}</div>
                {!selectedTrip && 
                    <Button className="w-full md:w-[80%]" onClick={() => onTripSelect(departureTravel)}>Seleccionar</Button>
                }
        </div>
    </div>
  )
}

export default TripDetail