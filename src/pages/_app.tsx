import '@/styles/globals.css'
import Footer from '@/components/common/footer/Footer'
import Header from '@/components/common/header/Header'
import type { AppProps } from 'next/app'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  import('../mocks').then(({ setupMocks }) => {
    setupMocks()
  })
}

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
