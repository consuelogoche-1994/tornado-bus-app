import Layout from "../../components/Layout"
import TripDetail from "@/components/TripDetail"
import { Button } from "@/components/ui/button"

function SeatSelection() {

  return (
    <Layout>
      <div className="pt-16">
        <h1 className='text-2xl mb-6 mt-6'>Resumen de tu viaje</h1>
        <TripDetail selectedTrip={true} />
        <div className="flex gap-6 mt-6">
          <div className="flex-1 bg-white rounded-md p-6">
            <h2 className='text-xl mb-6'>Asientos disponibles</h2>
            <div className="flex">
              <div className="flex-1 justify-between">
                  <div className="grid grid-cols-4 grid-rows-5 gap-1 p-4 border border-gray-300 rounded-xl">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <div className="cursor-poniter bg-primary/10 h-10 w-10 rounded-lg shadow-m flex items-center justify-center hover:bg-primary/90 hover:text-white">{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1"></div>
              <div>

              </div>
            </div>
   
          </div>
          <div className="flex-1 bg-white rounded-md p-6 flex flex-col gap-2">
            <h2 className='text-xl text-primary mb-4'>Detalle de compra</h2>
            <p className="font-semibold">Dallas I-30, TX (TBC Dallas I-30) - DLoredo I-30, TX (TBC Dallas I-30)</p>
            <p>jueves, 27 marzo - jueves, 27 marzo</p>
            <p>08:10 AM - 12:00 PM</p>
            <p>Asientos : A1, B2, B3, C4, C5</p>
            <hr className="my-2 border-gray-300" />
            <p>Cantidad de pasajeros: 5</p>
            <p>Precio por persona: $500</p>
            <div className="flex justify-between items-start">
              <p>Total: </p>
              <p className="text-2xl bg-accent p-2 rounded-xl">$2500</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-10">
              <Button variant="secondary" className="flex-1">Volverr</Button>
              <Button className="flex-1">Confirmar</Button>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default SeatSelection
