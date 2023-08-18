'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import styles from './authModalContainer.module.css'
import Image from 'next/image'
import loginPic from 'public/images/login.png'
import { IoMdClose } from 'react-icons/io'
import ModalBG from '@/components/common/modal/ModalBG'

interface AuthModalContainerProps {
  imgWidth: number
  imgHeight: number
  children: ReactNode
}

const AuthModalContainer = ({
  imgWidth,
  imgHeight,
  children,
}: AuthModalContainerProps) => {
  const router = useRouter()
  const onClick = () => {
    router.back()
  }

  return (
    <>
      <ModalBG />
      <div className={styles.container}>
        <IoMdClose className={styles.closeButton} onClick={onClick} />
        <div className={styles.imgArea}>
          <Image src={loginPic} alt="" width={imgWidth} height={imgHeight} />
        </div>
        <div>{children}</div>
      </div>
    </>
  )
}

export default AuthModalContainer
