import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'devHive',
  description: '개발자 프로젝트 커뮤니티',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko-KR">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
