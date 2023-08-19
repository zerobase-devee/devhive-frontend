import styles from './page.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>슬라이더 영역</div>
      <div className={styles.inner}></div>
    </div>
  )
}

export default Home
