import Layout from '../../components/Layout'
import PassengerTypeList from '../../components/PassengerType';

function Home() {

  return (
    <Layout showBanner={true}>
              <h1 className='mt-30'>Reserva de Viajes</h1>
              <PassengerTypeList />
    </Layout>
  )
}

export default Home