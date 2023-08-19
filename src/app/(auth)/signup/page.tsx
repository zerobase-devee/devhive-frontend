import styles from './signup.module.css'
import AuthContainer from '@/components/auth/authContainer/AuthContainer'
import SignupForm from '@/components/auth/signupForm/SignupForm'

const SignUp = () => {
  return (
    <AuthContainer>
      <div className={styles.rightSideArea}>
        <SignupForm />
      </div>
    </AuthContainer>
  )
}

export default SignUp
