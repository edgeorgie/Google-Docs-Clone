import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import "@material-tailwind/react/tailwind.css"
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
