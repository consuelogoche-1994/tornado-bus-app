import Layout from '../../components/Layout'
import { useCitiesOrigin } from "../../hooks/useCitiesOrigin";
import { useDepartureTravel } from "../../hooks/useDepartureTravel";
// import { useDepartureTravel } from "../../hooks/useDepartureTravel";
const { departureTravels } = useDepartureTravel();
function Home() {
  const { citiesOrigin, fetchCitiesOrigin } = useCitiesOrigin();

  console.log(citiesOrigin);
  console.log(departureTravels);
  // const [departureTravels, fetchDepartureTravels ] = useDepartureTravel();
  // console.log(departureTravels??"no cargo");
  return (
    <Layout showBanner={true}>
              <h1 className='mt-30'></h1>
    </Layout>
  )
}

export default Home