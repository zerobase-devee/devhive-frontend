import { ReactNode } from 'react'
import styles from './authContainer.module.css'
import Image from 'next/image'
import loginPic from 'public/images/login.png'
import { IoMdClose } from 'react-icons/io'

interface AuthContainerProps {
  imgWidth: number
  imgHeight: number
  children: ReactNode
}

const AuthContainer = ({
  imgWidth,
  imgHeight,
  children,
}: AuthContainerProps) => {
  return (
    <div className={styles.container}>
      <IoMdClose className={styles.closeButton} />
      <div className={styles.imgArea}>
        <Image src={loginPic} alt="" width={imgWidth} height={imgHeight} />
      </div>
      <div className={styles.rightSideArea}>{children}</div>
    </div>
  )
}

export default AuthContainer
