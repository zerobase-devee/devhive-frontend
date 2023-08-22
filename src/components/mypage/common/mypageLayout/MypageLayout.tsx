import styles from './mypageLayout.module.css'
import MypageMenu from '../menu/MypageMenu'
import Container from '@/components/common/container/Container'

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <nav className={styles.nav}>
        <p>마이페이지</p>
        <ul className={styles.menu}>
          <MypageMenu />
        </ul>
      </nav>
      <div className={styles.childrenContainer}>{children}</div>
    </Container>
  )
}

export default MypageLayout
