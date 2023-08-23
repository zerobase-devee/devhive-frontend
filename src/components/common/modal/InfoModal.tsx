import styles from './infomodal.module.css'
import ModalBG from './ModalBG'
import Button from '../button/Button'
import ModalPortal from './ModalPortal'

interface ModalProps {
  children: React.ReactNode
  buttonText: string
  onClick: () => void
}

const Modal = ({ children, buttonText, onClick }: ModalProps) => {
  return (
    <ModalPortal>
      <ModalBG />
      <div className={styles.container}>
        <p>{children}</p>
        <Button fill onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </ModalPortal>
  )
}

export default Modal
