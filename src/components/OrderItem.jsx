import moment from 'moment'
import Image from 'next/image'
import { motion } from 'framer-motion'

const OrderItem = ({ id, amount, amountShipping, items, timestamp, images }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once:true }}
      className='relative border rounded-md'
    >
      <div className='flex items-center p-5 space-x-10 bg-gray-100 text-sm text-gray-600'>
        <div>
          <p className='text-xs font-bold'>ORDER PLACED</p>
          <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
        </div>

        <div>
          <p className='text-xs font-bold'>TOTAL</p>
          <p>
            &#8377;{amount} - Next Day Delivery &#8377;{amountShipping}
          </p>
        </div>

        <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-sky-500'>
          {items.length} item&#40;s&#41;
        </p>

        <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
          ORDER # {id}
        </p>
      </div>

      <div className='p-5 sm:p-10'>
        <div className='flex space-x-6 overflow-x-auto'>
          {images.map((image, idx) => (
            <Image key={idx} src={image} alt='' width={150} height={150} objectFit='contain' />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
 
export default OrderItem;