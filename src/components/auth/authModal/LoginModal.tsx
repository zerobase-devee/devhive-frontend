import styles from './loginModal.module.css'
import AuthTitle from '@/components/auth/authTitle/Title'
import AuthModalContainer from '@/components/auth/authModal/AuthModalContainer'
import LoginForm from '@/components/auth/loginForm/LoginForm'
import { usePathname, useRouter } from 'next/navigation'
import Button from '@/components/common/button/Button'
import KakaoLoginButton from '../sns/KakaoLoginButton'
import GoogleLoginButton from '../sns/GoogleLoginButton'
import NaverLoginButton from '../sns/NaverLoginButton'

const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleSignupButtonClick = () => {
    router.replace(pathname)
    const queryString = new URLSearchParams()
    queryString.set('user', 'signup')
    router.push(pathname + '?' + queryString.toString())
  }

  return (
    <>
      <AuthModalContainer
        closeModal={closeModal}
        imgWidth={444}
        imgHeight={444}
      >
        <div className={styles.rightSideArea}>
          <AuthTitle text="에 로그인하세요" />
          <>
            <LoginForm />
            <div className={styles.signupButtonArea}>
              <p className={styles.text}>
                아직 <span className={styles.bold}>devHive</span>의 회원이
                아니신가요?
              </p>
              <Button onClick={handleSignupButtonClick}>
                이메일로 시작하기
              </Button>
              <KakaoLoginButton />
              <NaverLoginButton />
              <GoogleLoginButton />
            </div>
          </>
        </div>
      </AuthModalContainer>
    </>
  )
}
export default LoginModal
