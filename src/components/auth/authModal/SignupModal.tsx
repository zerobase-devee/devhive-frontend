import styles from './signupModal.module.css'
import AuthModalContainer from '@/components/auth/authModal/AuthModalContainer'
import SignupForm from '@/components/auth/signupForm/SignupForm'

const SignUpModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <AuthModalContainer closeModal={closeModal} imgWidth={374} imgHeight={390}>
      <div className={styles.rightSideArea}>
        <SignupForm />
      </div>
    </AuthModalContainer>
  )
}

export default SignUpModal
