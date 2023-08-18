import AuthModalContainer from '@/components/auth/authModal/AuthModalContainer'
import SignupForm from '@/components/auth/signupForm/SignupForm'

const SignUp = () => {
  return (
    <AuthModalContainer imgWidth={374} imgHeight={390}>
      <SignupForm />
    </AuthModalContainer>
  )
}

export default SignUp
