import Logo from 'public/svgs/logoS.svg'
import styles from './page.module.css'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="mainContainer">
      <Logo />
      <div className={styles.box}>메인페이지</div>
    </div>
  )
}

export default Home
