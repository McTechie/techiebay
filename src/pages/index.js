import Head from 'next/head'
import { Banner, Header } from '../components'

export default function Home() {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Techiebay | Exclusive Store for Techies</title>
        <meta name='description' content='An E-Commerce Web Application created by McTechie' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        <Banner />

      </main>
    </div>
  )
}
