import AuthContainer from '@/components/auth/authModal/AuthModal'
import SignupForm from '@/components/auth/signupForm/SignupForm'

const SignUp = () => {
  return (
    <AuthContainer imgWidth={374} imgHeight={390}>
      <SignupForm />
    </AuthContainer>
  )
}

export default SignUp
