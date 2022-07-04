import Image from 'next/image'
import { StarIcon, TrashIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart, removeAllFromCart } from '../redux/slices/cartSlice'

const CartItem = ({ id, title, price, description, category, image, stars, hasPrimeDelivery, count }) => {
  const dispatch = useDispatch();

  const handleAddItemToCart = () => {
    const item = { id, title, price, description, category, image, stars, hasPrimeDelivery };

    dispatch(addToCart(item));
  }

  const handleRemoveItemFromCart = () => {
    dispatch(removeFromCart({ id }));
  }

  const handleRemoveAllItemsFromCart = () => {
    const userDecision = confirm('You are trying to delete ' + title + ' (Quantity: ' + count + ') from the Cart');

    if (userDecision) {
      dispatch(removeAllFromCart({ id }));
    }
  }
  
  return (
    <div className='grid grid-cols-5 shadow-md p-3'>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        objectFit='contain'
      />

      <div className='col-span-4 mx-5'>
        <p className='text-lg font-bold'>
          {title}
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

        <div className='flex items-center'>
          <button className='btnAlt' onClick={handleRemoveItemFromCart}>-</button>
          <span className='mx-3'>{count}</span>
          <button className='btnAlt' onClick={handleAddItemToCart}>+</button>
          <button className='btnDelete ml-3' onClick={handleRemoveAllItemsFromCart}>
            <TrashIcon className='h-5' />
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default CartItem;