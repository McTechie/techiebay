import { useState, useEffect } from 'react'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { useSelector, useDispatch } from 'react-redux'
import { selectItems, fetchCartFromStorage } from '../redux/slices/cartSlice'
import { Header, Footer, CartItems, Sidebar } from '../components'

const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  
  const [totalItems, setTotalItems] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearchOverlay = () => {
    setIsSearching(isSearching => !isSearching);
  };

  // useEffect(() => {
  //   const storageItems = localStorage.getItem('techiebay cart') || [];
  //   dispatch(fetchCartFromStorage(JSON.parse(storageItems)));
  // }, []);

  useEffect(() => {
    let total = 0;

    items.length > 0 && items.forEach(item => {
      total += item.count;
    });

    setTotalItems(total);
  }, [items]);

  useEffect(() => {
    window.addEventListener('scroll', () => setIsSearching(false));
    return () => window.removeEventListener('scroll', () => {});
  }, [isSearching]);

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

        <Sidebar items={items} totalItems={totalItems} />

      </main>

      <Footer />
    </div>
  );
}
 
export default Checkout;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}