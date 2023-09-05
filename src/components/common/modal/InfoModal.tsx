import styles from './infomodal.module.css'
import ModalBG from './ModalBG'
import Button from '../button/Button'
import ModalPortal from './ModalPortal'

interface ModalProps {
  children: React.ReactNode
  buttonText: string
  onClick: () => void
  doubleButton?: boolean
  onClose?: () => void
  buttonText2?: string
}

const InfoModal = ({
  children,
  buttonText,
  onClick,
  doubleButton,
  onClose,
  buttonText2,
}: ModalProps) => {
  return (
    <ModalPortal>
      <ModalBG />
      <div className={styles.container}>
        <p>{children}</p>
        {doubleButton ? (
          <div className={styles.buttonArea}>
            <Button onClick={onClose}>{buttonText2}</Button>
            <Button fill onClick={onClick}>
              {buttonText}
            </Button>
          </div>
        ) : (
          <Button fill onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </ModalPortal>
  )
}

export default InfoModal
