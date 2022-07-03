import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '../redux/app/store'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp