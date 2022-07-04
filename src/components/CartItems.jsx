import Image from 'next/image'
import { useRouter } from 'next/router'
import CartItem from './CartItem'

const CartItems = ({ items }) => {
  const router = useRouter();

  return (
    <div className='flex-grow m-5 shadow-md'>
      <Image
        src='/checkout_banner.png'
        alt='Techiebay Prime Day'
        width={1020}
        height={250}
        objectFit='contain'
      />

      <div className='flex flex-col p-5 space-y-10 bg-white'>
        <h1 className='text-3xl border-b pb-4'>
          Your Cart
        </h1>

        {!items.length && (
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
            <div className='lg:col-span-3 justify-self-center'>
              <Image  src='/emptyCart.svg' width={500} height={300} />
            </div>
            <div className='shadow-md p-10 lg:col-span-2 space-y-5 max-h-64 lg:mr-10'>
              <h4 className='text-xl font-bold'>Your Cart feels lonely.</h4>
              <p className='font-light'>Your shopping cart lives to serve. Give it purpose - fill it with books, electronicts, videos, etc. and make it happy.</p>
              <button className='btn mt-2 hover:scale-105 duration-300' onClick={() => router.push('/')}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {items && items.map(({ id, title, price, description, category, image, stars, hasPrimeDelivery, count }, idx) => (
          <CartItem
            key={idx}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            stars={stars}
            hasPrimeDelivery={hasPrimeDelivery}
            count={count}
          />
        ))}
      </div>
    </div>
  );
}
 
export default CartItems;