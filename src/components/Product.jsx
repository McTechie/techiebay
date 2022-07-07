import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BadgeCheckIcon, StarIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectItems } from '../redux/slices/cartSlice'
import { motion } from 'framer-motion'

const Product = ({ id, title, price, description, category, image, rating, setShowProductPreview, setProductPreviewData }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const [stars, setStars] = useState(0);
  const [hasPrimeDelivery, setHasPrimeDelivery] = useState(false);

  const fetchProductInfo = async (id) => {
    const res = await fetch('https://fakestoreapi.com/products/' + id);
    const products = await res.json();

    setShowProductPreview(true);
    setProductPreviewData({...products, stars, hasPrimeDelivery});
  }

  const handleAddItemToCart = () => {
    const count = 1;
    const item = { id, title, price: Math.round(price * 10), description, category, image, stars, hasPrimeDelivery, count };

    dispatch(addToCart(item));
  }

  // Prevents react-hydration-error -> initially rendered DOM is different from pre-rendered DOM
  useEffect(() => {
    setStars(Math.floor(rating));
    setHasPrimeDelivery(Math.random() < 0.5);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className='relative flex flex-col m-5 bg-white z-30 p-10 hover:cursor-pointer rounded-lg'
      onClick={() => fetchProductInfo(id)}
    >
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        objectFit='contain'
        placeholder='empty'
      />
      
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
        &#8377;{Math.round(price * 10)} <span className='text-red-400 ml-1 text-sm line-through'>{Math.round(price * 10 * 1.5)}</span>
      </div>

      {hasPrimeDelivery && (
        <div className='flex items-center space-x-2 -mt-5 mb-2'>
          <Image src='/prime.png' alt='Techiebay Prime Delivery' width={50} height={50} />
          <p className='text-xs text-gray-500'>Next-Day Delivery</p>
        </div>
      )}

      <button
        disabled={items.findIndex(item => item.id === id) >= 0}
        onClick={handleAddItemToCart}
        className='mt-auto btn disabled:from-orange-500 disabled:to-orange-400'
      >
        {items.findIndex(item => item.id === id) >= 0 ? (
            <div className='flex items-center justify-center'>
              <BadgeCheckIcon className='h-5 mr-2' />
              Added to Cart
            </div>
          ) : (
          'Add to Cart'
        )}
      </button>
    </motion.div>
  );
}
 
export default Product;