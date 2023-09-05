import Head from 'next/head'
import styles from '@/styles/pages/home.module.css'
import MainProjectList from '@/components/main/contents/MainProjectList'
import MainRankList from '@/components/main/contents/MainRankList'
import Carousel from '@/components/main/carousel/Carousel'
import { GetServerSideProps } from 'next'

const Home = () => {
  return (
    <>
      <Head>
        <title>devHive</title>
        <meta name="description" content="devHive-개발자 프로잭트 커뮤니티" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Carousel />
        <div className={styles.inner}>
          <div className={styles.contentContainer}>
            <h2 className={styles.title}>프로젝트</h2>
            <MainProjectList />
          </div>
          <div className={styles.contentContainer}>
            <h2 className={styles.title}>랭킹</h2>
            <MainRankList />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const accessToken = req.cookies.accessToken || null
  const refreshToken = req.cookies.refreshToken || null
  const isLogin = accessToken !== null && refreshToken !== null ? true : false

  return {
    props: {
      initialAuth: isLogin,
    },
  }
}

export default Home
