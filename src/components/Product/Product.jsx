import { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'

const Product = ({ id, title, price, description, category, image, rating }) => {
  const stars = Math.floor(rating);
  const hasPrimeDelivery = Math.random() < 0.5;

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

      <Image src={image} alt={title} width={200} height={200} objectFit='contain' />
      
      <h4 className='my-3'>{title}</h4>

      <div className='flex'>
        {Array(stars)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className='h-5 text-orange-500' />
          ))}
      </div>
      
      <p className='text-xs my-2'>
        { description.length > 120 ? description.substring(0, 120) + '...' : description }
      </p>

      <div className='mb-5'>
        &#8377;{price * 10}
      </div>

      {hasPrimeDelivery && (
        <div className='flex items-center space-x-2 -mt-5'>
          <Image src='/prime.png' alt='Techiebay Prime Delivery' width={50} height={50} />
          <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
        </div>
      )}

      <button className='mt-auto btn'>Add to Cart</button>
    </div>
  );
}
 
export default Product;