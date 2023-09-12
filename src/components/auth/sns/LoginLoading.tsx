import styles from './loginLoading.module.css'
import Container from '@/components/common/container/Container'
import Loading from '@/components/common/loading/Loading'

const LoginLoading = () => {
  return (
    <Container>
      <div className={styles.loading}>
        <Loading size={70} strokeWidth={6} />
        <p>
          devHive에 로그인 중이에요. <br />
          잠시만 기다려주세요.
        </p>
      </div>
    </Container>
  )
}

export default LoginLoading
