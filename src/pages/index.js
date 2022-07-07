import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Banner, Footer, Header, ProductFeed, ProductPreview } from '../components'
import { getSession } from 'next-auth/react'

export default function Home({ products }) {
  const [isSearching, setIsSearching] = useState(false);
  const [showProductPreview, setShowProductPreview] = useState(false);

  const handleSearchOverlay = () => {
    setIsSearching(isSearching => !isSearching);
  }

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

        <div>
          {showProductPreview && <ProductPreview setShowProductPreview={setShowProductPreview} />}
        </div>

        <ProductFeed
          products={products}
          setShowProductPreview={setShowProductPreview}
        />
      </main>

      <Footer />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return {
    props: {
      products,
      session
    }
  }
}
