import styles from './login.module.css'
import KakaoIcon from 'public/svgs/kakao.svg'
import NaverIcon from 'public/svgs/naver.svg'
import GoogleIcon from 'public/svgs/google.svg'
import LinkButton from '@/components/common/button/LinkButton'
import AuthTitle from '@/components/auth/authTitle/Title'
import AuthModal from '@/components/auth/authModal/AuthModal'
import LoginForm from '@/components/auth/loginForm/LoginForm'

const Login = () => {
  return (
    <AuthModal imgWidth={444} imgHeight={444}>
      <div className={styles.rightSideArea}>
        <AuthTitle text="에 로그인하세요" />
        <LoginForm />
        <div className={styles.signupButtonArea}>
          <p className={styles.text}>
            아직 <span className={styles.bold}>devHive</span>의 회원이
            아니신가요?
          </p>
          <LinkButton href="/signup">이메일로 시작하기</LinkButton>
          <button type="button" className={styles.kakao}>
            <KakaoIcon />
            카카오로 시작하기
          </button>
          <button type="button" className={styles.naver}>
            <NaverIcon />
            네이버로 시작하기
          </button>
          <button type="button" className={styles.google}>
            <GoogleIcon />
            구글로 시작하기
          </button>
        </div>
      </div>
    </AuthModal>
  )
}

export default Login
