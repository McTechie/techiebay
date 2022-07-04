import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Banner, Footer, Header, ProductFeed } from '../components'
import { useDispatch } from 'react-redux'
import { fetchCartFromStorage } from '../redux/slices/cartSlice'

export default function Home({ products }) {
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const handleSearchOverlay = () => {
    setIsSearching(isSearching => !isSearching);
  }

  useEffect(() => {
    const storageItems = localStorage.getItem('techiebay cart') || [];
    dispatch(fetchCartFromStorage(JSON.parse(storageItems)));
  }, []);

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

      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
        <ProductFeed products={products} />
      </main>

      <Footer />
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return {
    props: {
      products
    }
  }
}
