import { IoMdClose } from 'react-icons/io'
import styles from './dialogModal.module.css'
import ModalBG from './ModalBG'
import ModalPortal from './ModalPortal'

interface DialogModalProps {
  readonly title: string
  readonly modalContnet: React.ReactNode
  readonly closeModal: () => void
}

const DialogModal = ({ title, modalContnet, closeModal }: DialogModalProps) => {
  return (
    <ModalPortal>
      <ModalBG />
      <div className={styles.container}>
        <IoMdClose className={styles.closeButton} onClick={closeModal} />
        <p className={styles.title}>{title}</p>
        <div className={styles.modailContent}>{modalContnet}</div>
      </div>
    </ModalPortal>
  )
}

export default DialogModal
