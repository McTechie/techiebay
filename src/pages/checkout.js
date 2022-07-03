import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectItems } from '../redux/slices/cartSlice'
import { Header, Footer, CartItems, CheckoutSidebar } from '../components'

const Checkout = () => {
  const items = useSelector(selectItems);
  
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchOverlay = () => {
    setIsSearching(isSearching => !isSearching);
  }

  useEffect(() => {
    window.addEventListener('scroll', () => setIsSearching(false));
    return () => window.removeEventListener('scroll', () => {});
  });

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Techiebay | Exclusive Store for Techies</title>
        <meta name='description' content='An E-Commerce Web Application created by McTechie' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header handleSearchOverlay={handleSearchOverlay} />

      {isSearching && <div onClick={handleSearchOverlay} className='h-screen w-full bg-black opacity-60 z-50 absolute' />}

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        
        <CartItems items={items} />

        <CheckoutSidebar items={items} />

      </main>

      <Footer />
    </div>
  );
}
 
export default Checkout;