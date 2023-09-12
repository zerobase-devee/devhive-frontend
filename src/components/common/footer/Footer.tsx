import Link from 'next/link'
import styles from './Footer.module.css'
import Logo from 'public/svgs/logoS.svg'
import { SiNotion, SiGithub } from 'react-icons/si'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.info}>
          <h2>Team - Devee</h2>
          <ul>
            <li>Front-End: 이아름</li>
            <li>Back-End: 김동역 김민정 김재윤</li>
          </ul>
        </div>
        <ul className={styles.link}>
          <li>
            <Link
              href="https://ahahahahreum.notion.site/Devee-devHive-a935c69b7da04a3b850e96fc21d894f5?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
            >
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

export default Footer
