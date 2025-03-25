import Layout from '@/components/Layout';
import Carousel from '@/components/carousel';

function Home() {

  return (
    <Layout showBanner={true}>
          <div className='pt-6'>
            <Carousel></Carousel>
          </div>
    </Layout>
  )
}

export default Home