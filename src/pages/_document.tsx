import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="ko-KR">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
export default Document
