import styles from './login.module.css'
import AuthTitle from '@/components/auth/authTitle/Title'
import LoginForm from '@/components/auth/loginForm/LoginForm'
import AuthContainer from '@/components/auth/authContainer/AuthContainer'

const Login = () => {
  return (
    <AuthContainer>
      <div className={styles.rightSideArea}>
        <AuthTitle text="에 로그인하세요" />
        <LoginForm />
      </div>
    </AuthContainer>
  )
}

export default Login
