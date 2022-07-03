import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Banner = () => {
  return (
    <div className='relative'>
      <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image priority src='/banner1.webp' alt='Home Shopping Spree' width={1536} height={630} />
        </div>
        <div>
          <Image src='/banner2.webp' alt='Buy Mobile Accessories' width={1536} height={630} />
        </div>
        <div>
          <Image src='/banner3.webp' alt='Content Creator Accessories' width={1536} height={630} />
        </div>
      </Carousel>
    </div>
  );
}
 
export default Banner;