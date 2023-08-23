import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './Header.module.css'
import Logo from 'public/svgs/logoS.svg'
import Link from 'next/link'
import Button from '../button/Button'
import LoginModal from '@/components/auth/authModal/LoginModal'
import SignUpModal from '@/components/auth/authModal/SignupModal'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = () => {
    document.body.classList.add('modalOpen')

    const queryString = new URLSearchParams()
    queryString.set('user', 'login')
    router.push(pathname + '?' + queryString.toString())
  }

  const handleCloseModal = () => {
    document.body.classList.remove('modalOpen')
    router.replace(pathname)
  }

  return (
    <>
      {searchParams.get('user') === 'signup' && (
        <SignUpModal closeModal={handleCloseModal} />
      )}
      {searchParams.get('user') === 'login' && (
        <LoginModal closeModal={handleCloseModal} />
      )}
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
                <Link href="/project">프로젝트</Link>
              </li>
              <li>
                <Link href="/rank">랭킹</Link>
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
