import styles from './loginModal.module.css'
import AuthTitle from '@/components/auth/authTitle/Title'
import AuthModalContainer from '@/components/auth/authModal/AuthModalContainer'
import LoginForm from '@/components/auth/loginForm/LoginForm'

const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <AuthModalContainer closeModal={closeModal} imgWidth={444} imgHeight={444}>
      <div className={styles.rightSideArea}>
        <AuthTitle text="에 로그인하세요" />
        <LoginForm />
      </div>
    </AuthModalContainer>
  )
}

export default LoginModal
