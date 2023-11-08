import styles from './authModalContainer.module.css'
import Image from 'next/image'
import loginPic from 'public/images/login.png'
import { IoMdClose } from 'react-icons/io'
import ModalBG from '@/components/common/modal/ModalBG'
import ModalPortal from '@/components/common/modal/ModalPortal'
import useResponsiveSize from '@/hooks/useResponsiveSize'

interface AuthModalContainerProps {
  children: React.ReactNode
  closeModal: () => void
}

const AuthModalContainer = ({
  children,
  closeModal,
}: AuthModalContainerProps) => {
  const { isTablet, isMobile } = useResponsiveSize()

  return (
    <ModalPortal>
      <ModalBG />
      <div className={styles.container}>
        <IoMdClose className={styles.closeButton} onClick={closeModal} />
        {!isTablet && !isMobile && (
          <div className={styles.imgArea}>
            <Image src={loginPic} alt="" layout="fill" />
          </div>
        )}
        <div>{children}</div>
      </div>
    </ModalPortal>
  )
}

export default AuthModalContainer
