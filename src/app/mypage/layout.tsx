import styles from './mypage.module.css'
import Container from '@/components/common/container/Container'

const mypageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container style={styles.container}>
      <div>마이페이지</div>
      {children}
    </Container>
  )
}

export default mypageLayout
