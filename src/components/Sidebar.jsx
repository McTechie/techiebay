import { signIn, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { selectTotal } from '../redux/slices/cartSlice'
import SidebarItem from './SidebarItem'

const CheckoutSidebar = ({ items, totalItems }) => {
  const { data: session } = useSession();
  const total = useSelector(selectTotal);

  const handleCheckout = () => {
    if (!session) {
      signIn();
    } else {
      console.log('Checking Out');
    }
  }

  return (
    <div className='flex flex-col bg-white p-10 shadow-md'>
      {totalItems > 0 && (
        <>
          <h2 className='whitespace-nowrap my-2'>
            Subtotal &#40;{totalItems} items&#41;:
            <span className='ml-2 font-bold'>&#8377;{total}</span>
          </h2>

          {items.map(({ title, price, image, stars, hasPrimeDelivery, count }, idx) => (
            <SidebarItem
              key={idx}
              title={title}
              price={price}
              image={image}
              stars={stars}
              hasPrimeDelivery={hasPrimeDelivery}
              count={count}
            />
          ))}

          <button
            onClick={handleCheckout}
            className={`btn mt-4 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-200'}`}
          >
            {!session ? 'Sign In to Checkout' : 'Proceed to Checkout'}
          </button>
        </>
      )}
    </div>
  );
}
 
export default CheckoutSidebar;