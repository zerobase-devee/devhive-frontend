import Link from 'next/link'
import styles from './Footer.module.css'
import Logo from 'public/svgs/Logo.svg'
import { SiNotion, SiGithub } from 'react-icons/si'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.info}>
          <h2>Team - Devee</h2>
          <ul>
            <li>Front-End: 이아름 황수연</li>
            <li>Back-End: 김동역 김민정 김재윤</li>
          </ul>
        </div>
        <ul className={styles.link}>
          <li>
            <Link href="#">
              <SiNotion />
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/zerobase-devee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
