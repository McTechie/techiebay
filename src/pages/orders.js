import { Footer, Header, OrderItem } from '../components'
import { getSession, useSession } from 'next-auth/react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import db from '../../firebase'
import moment from 'moment'

const Orders = ({ orders }) => {
  const { data: session } = useSession();

  return (
    <div>
      <Header />

      <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-lg lg:text-3xl border-b mb-2 pb-1 border-orange-400'>
          Your Orders
        </h1>
        
        {session ? (
          <h2>{orders.length} order&#40;s&#41;</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className='mt-5 space-y-4'>
          {orders?.map(order => (
            <OrderItem
              key={order.id}
              id={order.id}
              amount={order.amount}
              amountShipping={order.amountShipping}
              items={order.items}
              timestamp={order.timestamp}
              images={order.images}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
 
export default Orders;

export const getServerSideProps = async (context) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {}
    }
  }

  const ordersRef = collection(db, 'users', session.user.email, 'orders');
  const ordersQuery = query(ordersRef, orderBy('timestamp', 'desc'));
  const ordersInFirebase = await getDocs(ordersQuery);
  
  const orders = await Promise.all(
    ordersInFirebase.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
      session
    }
  }
}