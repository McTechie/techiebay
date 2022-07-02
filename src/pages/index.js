import Head from 'next/head'
import { Header } from '../components'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Techiebay | Exclusive Store for Techies</title>
        <meta name='description' content='An E-Commerce Web Application created by McTechie' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
    </div>
  )
}
