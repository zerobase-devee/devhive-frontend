import React from 'react'
import styles from './Header.module.css'
import Logo from 'public/svgs/logoS.svg'
import Link from 'next/link'
import LinkButton from '../common/button/LinkButton'

export default function Header() {
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
          <LinkButton href="/login" fill>
            로그인
          </LinkButton>
          <Link href={'/'} shallow={true} as={'/login'}>
            로그인
          </Link>
        </div>
      </div>
    </header>
  )
}
