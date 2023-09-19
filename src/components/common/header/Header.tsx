import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './Header.module.css'
import Logo from 'public/svgs/logoS.svg'
import Link from 'next/link'
import Button from '../button/Button'
import LoginModal from '@/components/auth/authModal/LoginModal'
import SignUpModal from '@/components/auth/authModal/SignupModal'
import { BiSolidMessageAltDetail } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import Alarm from '@/components/alarm/Alarm'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { loginState } from '@/recoil/loginState'
import { signout } from '@/apis/auth/signout'
import { useCookies } from 'react-cookie'
import useLogin from '@/hooks/queries/useLogin'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import LoginUserProfile from './LoginUserProfile'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenAlarm, setIsOpenAlarm] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const alarmRef = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [cookies, , removeCookie] = useCookies()
  const { refreshTokenMutation } = useLogin()
  const resetUserInfo = useResetRecoilState(loginUserInfo)

  useEffect(() => {
    if (cookies.refreshToken && cookies.accessToken) {
      setIsLogin(true)
      const refreshTokenInterval = setInterval(
        () => {
          refreshTokenMutation.mutateAsync().catch((error) => {
            console.error('토큰 갱신 실패:', error)
            setIsLogin(false)
          })
        },
        40 * 60 * 1000,
      )

      return () => {
        clearInterval(refreshTokenInterval)
      }
    } else {
      setIsLogin(false)
    }
  }, [
    cookies.accessToken,
    cookies.refreshToken,
    refreshTokenMutation,
    setIsLogin,
  ])

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
    document.body.style.overflow = 'hidden'
    const queryString = new URLSearchParams()
    queryString.set('user', 'login')
    router.push(pathname + '?' + queryString.toString())
  }

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto'
    router.replace(pathname)
  }

  const onLogout = async () => {
    try {
      await signout()
      queryClient.invalidateQueries(REACT_QUERY_KEY.accessToken)
      queryClient.invalidateQueries(REACT_QUERY_KEY.refreshToken)
      queryClient.invalidateQueries(REACT_QUERY_KEY.userInfo)
      queryClient.invalidateQueries(REACT_QUERY_KEY.loginUserProfile)
      removeCookie('accessToken', { path: '/' })
      removeCookie('refreshToken', { path: '/' })
      removeCookie('userInfo', { path: '/' })
      resetUserInfo()
      router.push('/')
    } catch (err) {
      console.log(err)
    }
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
            {isLogin ? (
              <div className={styles.buttonArea}>
                <div
                  ref={alarmRef}
                  className={styles.btnContainer}
                  onClick={handleToggleAlarm}
                >
                  <Alarm
                    isOpenAlarm={isOpenAlarm}
                    handleToggleAlarm={handleToggleAlarm}
                  />
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
                    <LoginUserProfile />
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
