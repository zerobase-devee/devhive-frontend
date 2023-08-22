import '@/styles/globals.css'
import Footer from '@/components/common/footer/Footer'
import Header from '@/components/common/header/Header'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="mainContainer">
        <Header />
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}

export default App
