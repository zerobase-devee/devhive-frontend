import styles from './authModalContainer.module.css'
import Image from 'next/image'
import loginPic from 'public/images/login.png'
import { IoMdClose } from 'react-icons/io'
import ModalBG from '@/components/common/modal/ModalBG'
import ModalPortal from '@/components/common/modal/ModalPortal'

interface AuthModalContainerProps {
  imgWidth: number
  imgHeight: number
  children: React.ReactNode
  closeModal: () => void
}

const AuthModalContainer = ({
  imgWidth,
  imgHeight,
  children,
  closeModal,
}: AuthModalContainerProps) => {
  return (
    <ModalPortal>
      <ModalBG />
      <div className={styles.container}>
        <IoMdClose className={styles.closeButton} onClick={closeModal} />
        <div className={styles.imgArea}>
          <Image src={loginPic} alt="" width={imgWidth} height={imgHeight} />
        </div>
        <div>{children}</div>
      </div>
    </ModalPortal>
  )
}

export default AuthModalContainer
