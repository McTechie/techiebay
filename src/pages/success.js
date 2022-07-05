import { Footer, Header } from '../components'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

const Success = () => {
  const router = useRouter();

  return (
    <div className='bg-gray-100 h-screen'>
      <Header />

      <main className='max-w-screen-lg mx-auto mb-20 lg:mb-40'>
        <div className='flex flex-col p-10 bg-white shadow-sm'>
          <div className='flex items-center space-x-2 mb-5'>
            <CheckCircleIcon className='text-green-500 h-10' />
            <h1 className='text-lg font-bold lg:font-normal lg:text-3xl'>Thank you, your order has been confirmed!</h1>
          </div>
          <p>
            Thank you techie for shopping with us. We&#39;ll send you a confirmation once your item has shipped. If you would like to check the status of your order&#40;s&#41; please press the link below:
          </p>
          <button className='btn mt-8' onClick={() => router.push('/orders')}>
            Go to my orders
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
 
export default Success;

export const getServerSideProps = async (context) => {
  const session = getSession(context);

  return {
    props: {
      session
    }
  }
}