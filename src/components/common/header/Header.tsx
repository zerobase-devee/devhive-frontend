'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import styles from './Header.module.css'
import Logo from 'public/svgs/logoS.svg'
import Link from 'next/link'
import LinkButton from '../button/LinkButton'
import useModal from '@/hooks/useModal'

const Header = () => {
  const pathname = usePathname()
  const { handleOpenModal } = useModal()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    handleOpenModal()
    if (pathname === '/login') {
      e.preventDefault()
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <Link href="/">
            <Logo />
          </Link>
        </h1>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="#">프로젝트</Link>
            </li>
            <li>
              <Link href="#">랭킹</Link>
            </li>
          </ul>
        </nav>
        <div>
          <LinkButton href={'/login'} onClick={handleClick} fill>
            로그인
          </LinkButton>
        </div>
      </div>
    </header>
  )
}

export default Header