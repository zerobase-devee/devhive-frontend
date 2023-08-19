import styles from './page.module.css'
import Project from '@/components/Project/Project'
import Button from '@/components/Button/Button'
import Ranking from '@/components/Ranking/Ranking'

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>슬라이더 영역</div>
      <div className={styles.inner}>
        <h2 className={styles.title}>프로젝트</h2>
        <Project />
        <div className={styles.btn}>
          <Button>프로젝트 더보기</Button>
        </div>
        <h2 className={styles.title}>랭킹</h2>
        <Ranking />
        <div className={styles.btn}>
          <Button>랭킹 더보기</Button>
        </div>
      </div>
    </div>
  )
}

export default Home
