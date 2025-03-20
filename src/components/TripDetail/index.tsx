import { Button } from "@/components/ui/button"

interface tripDetailProps {
    selectedTrip: Boolean;
}
const TripDetail = ({ selectedTrip = false }: tripDetailProps) => {
  return (
    <div className="w-full bg-white rounded-md p-3 grid grid-cols-7">
        <div className='md:grid md:grid-cols-3 gap-2 col-span-6'>
        <div className='col-span-1'>
            <p className='text-primary font-semibold'>Origen</p>
            <div className='text-sm font-light'>jueves, 27 marzo</div>
            <div className='text-2xl text-primary'>08:10 AM</div>
            <div className='text-sm font-light text-gray-500'>Dallas I-30, TX (TBC Dallas I-30)</div>
        </div>

        <div className='col-span-1 w-full'>
            <div className='text-xl font-light text-center'>8h</div>
            <div className="visible border-t border-gray-400 mx-4"></div>
        </div>

        <div className='col-span-1'>
            <p className='text-primary font-semibold'>Destino</p>
            <div className='text-sm font-light'>jueves, 27 marzo</div>
            <div className='text-2xl text-primary '>12:10 PM</div>
            <div className='text-sm font-light text-gray-500'>Dallas I-30, TX (TBC Dallas I-30)</div>
        </div>
        </div>
        <div className='col-span-1 flex flex-col items-center justify-center'>
        <div className='text-sm font-light text-gray-500'>Precio por pasajero</div>
        <div className='text-2xl mb-2'>$240</div>
            {!selectedTrip && 
                <Button className="w-full md:w-[80%]">Seleccionar</Button>
            }
        </div>
  </div>
  )
}

export default TripDetail