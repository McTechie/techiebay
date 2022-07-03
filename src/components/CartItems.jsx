import Image from 'next/image'
import CartItem from './CartItem'

const CartItems = ({ items }) => {
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
          Shopping Cart {!items.length && 'is empty...'}
        </h1>

        {items.map(({ id, title, price, description, category, image, stars, hasPrimeDelivery }, idx) => (
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
          />
        ))}
      </div>
    </div>
  );
}
 
export default CartItems;