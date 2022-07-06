import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'

const SidebarItem = ({ title, price, image, stars, hasPrimeDelivery, count }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='hidden lg:grid grid-cols-3 shadow-md p-4 m-2 max-w-sm xl:max-w-md'
    >
      <Image
        src={image}
        alt={title}
        width={100}
        height={100}
        objectFit='contain'
      />

      <div className='col-span-2 ml-4 space-y-1'>
        <p className='text-xs xl:text-sm font-bold'>
          {title}
        </p>
        
        
        <p className='flex items-center text-xs italic font-normal text-gray-600'>
          <span className='mr-3'>Count: {count}</span>
          {hasPrimeDelivery && <Image src='/prime.png' alt='Techiebay Prime Delivery' width={40} height={40} />}
        </p>

        <div className='flex'>
          {Array(stars)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-orange-500' />
            ))}
        </div>

        <div className='mb-5'>
          &#8377;{price} <span className='text-red-400 ml-1 text-sm line-through'>{Math.round(price * 1.5)}</span>
        </div>
      </div>
    </motion.div>
  );
}
 
export default SidebarItem;