import 'react-quill/dist/quill.snow.css'
import '@/styles/globals.css'
import Footer from '@/components/common/footer/Footer'
import Header from '@/components/common/header/Header'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import { loginState } from '@/recoil/loginState'
import { loginUserInfo } from '@/recoil/loginUserInfo'

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient()
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
      import('../mocks')
    }
  }, [])

  return (
    <>
      <Head>
        <title>devHive</title>
        <meta name="description" content="devHive-개발자 프로젝트 커뮤니티" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot
          initializeState={({ set }) => {
            if (pageProps.initialAuth) {
              set(loginState, pageProps.initialAuth)
            }
            if (pageProps.initialUserInfo) {
              set(loginUserInfo, pageProps.initialUserInfo)
            }
          }}
        >
          <div className="mainContainer">
            <Header />
            <Component {...pageProps} />
          </div>
          <Footer />
        </RecoilRoot>
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
      </QueryClientProvider>
    </>
  )
}

export default App
