import Head from 'next/head'
import styles from '@/styles/pages/home.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import MainProjectList from '@/components/main/contents/MainProjectList'
import MainRankList from '@/components/main/contents/MainRankList'
import Carousel from '@/components/main/carousel/Carousel'

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
            <LinkButton href="/project">프로젝트 더보기</LinkButton>
          </div>
          <div className={styles.contentContainer}>
            <h2 className={styles.title}>랭킹</h2>
            <MainRankList />
            <LinkButton href="/rank">랭킹 더보기</LinkButton>
          </div>
          C
        </div>
      </div>
    </>
  )
}

export default Home
