import Layout from '../../components/Layout'
import TripDetail from '@/components/TripDetail';

function Trips() {
  const numbers: number[] = [1, 2, 3];
  return (
    <Layout showTripSelector={true}>
      <div className='mt-6'>
        <h1 className='text-2xl mb-6'>Elige un viaje disponible</h1>
 
        <div className="w-full flex flex-col gap-4">
          {numbers.map(index => (
            <TripDetail selectedTrip={false}  key={index} />
          ))}
        </div>
        <div className='flex gap-10'>
          <div className=''>

          </div>
          <div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Trips