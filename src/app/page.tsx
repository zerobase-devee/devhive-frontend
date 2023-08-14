import Logo from 'public/svgs/Logo.svg'
import styles from './page.module.css'

const Home = () => {
  return (
    <div className="mainContainer">
      <Logo />
      <div className={styles.box}>메인페이지</div>
    </div>
  )
}

export default Home
