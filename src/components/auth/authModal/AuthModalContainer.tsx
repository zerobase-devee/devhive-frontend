'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import styles from './authModalContainer.module.css'
import Image from 'next/image'
import loginPic from 'public/images/login.png'
import { IoMdClose } from 'react-icons/io'
import ModalBG from '@/components/common/modal/ModalBG'
import useModal from '@/hooks/useModal'

interface AuthModalContainerProps {
  imgWidth: number
  imgHeight: number
  children: React.ReactNode
}

const AuthModalContainer = ({
  imgWidth,
  imgHeight,
  children,
}: AuthModalContainerProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { closeModal } = useModal()

  const onClick = useCallback(() => {
    closeModal()
    if (pathname === '/signup') {
      router.back()
      router.back()
    } else {
      router.back()
    }
  }, [router, pathname, closeModal])

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
