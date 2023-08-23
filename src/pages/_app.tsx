import '@/styles/globals.css'
import Footer from '@/components/common/footer/Footer'
import Header from '@/components/common/header/Header'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
      import('../mocks')
    }
  }, [])

  return (
    <>
      <Head>
        <title>devHive</title>
        <meta name="description" content="devHive-개발자 프로잭트 커뮤니티" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <div className="mainContainer">
          <Header />
          <Component {...pageProps} />
        </div>
        <Footer />
      </RecoilRoot>
    </>
  )
}

export default App
