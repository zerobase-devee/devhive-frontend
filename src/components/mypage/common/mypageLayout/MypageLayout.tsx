import styles from './mypageLayout.module.css'
import MypageMenu from '../menu/MypageMenu'
import Container from '@/components/common/container/Container'
import useResponsiveSize from '@/hooks/useResponsiveSize'

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSmallDeskTop } = useResponsiveSize()

  return (
    <Container>
      {!isSmallDeskTop && (
        <nav className={styles.nav}>
          <p>마이페이지</p>
          <ul className={styles.menu}>
            <MypageMenu />
          </ul>
        </nav>
      )}
      <div className={styles.childrenContainer}>{children}</div>
    </Container>
  )
}

export default MypageLayout
