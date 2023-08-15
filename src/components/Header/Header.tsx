import React from 'react'
import styles from './Header.module.css'
import Logo from 'public/svgs/Logo.svg'
import Button from '../Button/Button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>
          <a href="/">
            <Logo />
          </a>
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
          <Button fill>로그인</Button>
        </div>
      </div>
    </header>
  )
}
