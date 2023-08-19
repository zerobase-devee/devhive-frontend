import styles from './signup.module.css'
import AuthModalContainer from '@/components/auth/authModal/AuthModalContainer'
import SignupForm from '@/components/auth/signupForm/SignupForm'

const SignUp = () => {
  return (
    <AuthModalContainer imgWidth={374} imgHeight={390}>
      <div className={styles.rightSideArea}>
        <SignupForm />
      </div>
    </AuthModalContainer>
  )
}

export default SignUp
