import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'

const CartItem = ({ id, title, price, description, category, image, stars, hasPrimeDelivery, count }) => {
  const dispatch = useDispatch();

  const handleAddItemToCart = () => {
    const item = { id, title, price, description, category, image, stars, hasPrimeDelivery };

    dispatch(addToCart(item));
  }

  const handleAddRemoveFromCart = () => {
    dispatch(removeFromCart({ id }));
  }
  
  return (
    <div className='grid grid-cols-5'>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        objectFit='contain'
      />

      <div className='col-span-3 mx-5'>
        <p className='text-lg font-bold'>
          {title}
        </p>

        <p className='text-sm my-2 italic'>
          Count: {count}
        </p>

        <div className='flex'>
          {Array(stars)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-orange-500' />
            ))}
        </div>

        <p className='text-xs my-2'>
          {description.length > 180 ? description.substring(0, 180) + '...' : description}
        </p>

        <div className='mb-5'>
          &#8377;{price}
        </div>

        {hasPrimeDelivery && (
          <div className='flex items-center space-x-2 -mt-5'>
            <Image src='/prime.png' alt='Techiebay Prime Delivery' width={50} height={50} />
            <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button className='btn' onClick={handleAddItemToCart}>Add to Cart</button>
        <button className='btn' onClick={handleAddRemoveFromCart}>Remove Cart</button>
      </div>
    </div>
  );
}
 
export default CartItem;