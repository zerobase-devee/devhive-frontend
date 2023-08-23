import { usePathname, useRouter } from 'next/navigation'
import styles from './Header.module.css'
import Logo from 'public/svgs/logoS.svg'
import Link from 'next/link'
import useModal from '@/hooks/useModal'
import Button from '../button/Button'
import LoginModal from '@/components/auth/authModal/LoginModal'

const Header = () => {
  const pathname = usePathname()
  const { openModal, handleOpenModal, handleCloseModal } = useModal()
  const router = useRouter()

  const handleClick = () => {
    handleOpenModal()

    const queryString = new URLSearchParams()
    queryString.set('user', 'login')
    router.push(pathname + '?' + queryString.toString())
  }

  return (
    <>
      {openModal && <LoginModal closeModal={handleCloseModal} />}
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
            <Button onClick={handleClick} fill>
              로그인
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
