import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { selectTotal } from '../redux/slices/cartSlice'

const CheckoutSidebar = ({ totalItems }) => {
  const { data: session } = useSession();
  const total = useSelector(selectTotal);

  return (
    <div className='flex flex-col bg-white p-10 shadow-md'>
      {totalItems > 0 && (
        <>
          <h2 className='whitespace-nowrap'>
            Subtotal &#40;{totalItems} items&#41;:
            <span className='ml-2 font-bold'>&#8377;{total}</span>
          </h2>

          <button disabled={!session} className={`btn mt-4 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
            {!session ? 'Sign In to Checkout' : 'Proceed to Checkout'}
          </button>
        </>
      )}
    </div>
  );
}
 
export default CheckoutSidebar;