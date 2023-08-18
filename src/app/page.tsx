import styles from './page.module.css'
import Project from '@/components/Project/Project'

const Home = () => {
  return (
    <>
      <div className={styles.slider}>슬라이더 영역</div>
      <div className={styles.inner}>
        <h2 className={styles.title}>프로젝트</h2>
        <Project />
      </div>
    </>
  )
}

export default Home
