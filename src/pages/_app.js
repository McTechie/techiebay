import Router from 'next/router'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '../redux/app/store'
import ProgressBar from '@badrap/bar-of-progress'
import '../styles/globals.css'

const progress = new ProgressBar({
  size: 3,
  color: '#fb923c',
  className: 'z-50',
  delay: 100
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

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