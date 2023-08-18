import './globalStyle.css'
import type { Metadata } from 'next'
import './globalStyle.css'
import localFont from 'next/font/local'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = {
  title: 'devHive',
  description: '개발자 프로젝트 커뮤니티',
}

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
})

interface RootLayoutProps {
  children: React.ReactNode
  authModal: React.ReactNode
}

const RootLayout = ({ children, authModal }: RootLayoutProps) => {
  return (
    <html lang="ko-KR" className={pretendard.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="mainContainer">
          <Header />
          {children}
          {authModal}
        </div>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
