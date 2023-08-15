import React from 'react'
import styles from './Header.module.css'
import Logo from 'public/svgs/logoS.svg'
import Button from '../Button/Button'

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
              <a href="#">프로젝트</a>
            </li>
            <li>
              <a href="#">랭킹</a>
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
