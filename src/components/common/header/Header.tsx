import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './Header.module.css'
import Logo from 'public/svgs/logoS.svg'
import Link from 'next/link'
import Button from '../button/Button'
import LoginModal from '@/components/auth/authModal/LoginModal'
import SignUpModal from '@/components/auth/authModal/SignupModal'
import { HiBell } from 'react-icons/hi'
import { BiSolidMessageAltDetail } from 'react-icons/bi'
import UserProfileImg from '../userProfileImg/UserProfileImg'
import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import Alarm from '@/components/alarm/Alarm'
import { useRecoilValue } from 'recoil'
import { authState } from '@/recoil/authToken'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenAlarm, setIsOpenAlarm] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const alarmRef = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()
  const authData = useRecoilValue(authState)
  const { accessToken, refreshToken } = authData || {}

  useEffect(() => {
    const handleClickOutside = (e: { target: any }) => {
      if (
        isOpenMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpenMenu(false)
      }
      if (
        isOpenAlarm &&
        alarmRef.current &&
        !alarmRef.current.contains(e.target)
      ) {
        setIsOpenAlarm(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpenMenu, isOpenAlarm])

  const handleToggleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const handleToggleAlarm = () => {
    setIsOpenAlarm(!isOpenAlarm)
  }

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

  const onLogout = async () => {
    console.log('logout')

    await Promise.all([
      queryClient.invalidateQueries('accessToken'),
      queryClient.invalidateQueries('refreshToken'),
    ])

    router.push('/')
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
          <>
            {accessToken && refreshToken ? (
              <div className={styles.buttonArea}>
                <div
                  ref={alarmRef}
                  className={styles.btnContainer}
                  onClick={handleToggleAlarm}
                >
                  <button className={styles.btn}>
                    <span className={styles.badge}>0</span>
                    <HiBell />
                  </button>
                  {isOpenAlarm && <Alarm />}
                </div>
                <Link className={styles.chat} href={'/chat'}>
                  <span className={styles.badge}>0</span>
                  <BiSolidMessageAltDetail />
                </Link>
                <div
                  className={styles.btnContainer}
                  ref={menuRef}
                  onClick={handleToggleMenu}
                >
                  <button className={styles.btn}>
                    <UserProfileImg userProfile={null} width={48} height={48} />
                  </button>
                  {isOpenMenu && (
                    <div className={styles.menuContainer}>
                      <Link href={'/project/write'} className={styles.menu}>
                        프로젝트올리기
                      </Link>
                      <Link href={'/mypage/myprofile'} className={styles.menu}>
                        마이페이지
                      </Link>
                      <button className={styles.menu} onClick={onLogout}>
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Button onClick={handleClick} fill>
                로그인
              </Button>
            )}
          </>
        </div>
      </header>
    </>
  )
}

export default Header
