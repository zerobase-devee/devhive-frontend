import { useSearchParams } from 'next/navigation'
import styles from './Header.module.css'
import Logo from 'public/svgs/logoS.svg'
import Link from 'next/link'
import Button from '../button/Button'
import LoginModal from '@/components/auth/authModal/LoginModal'
import SignUpModal from '@/components/auth/authModal/SignupModal'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { loginState } from '@/recoil/loginState'
import { useCookies } from 'react-cookie'
import useLogin from '@/hooks/queries/useLogin'
import LoginUserProfile from './LoginUserProfile'
import MobileMenu from './ModileMenu'
import useResponsiveSize from '@/hooks/useResponsiveSize'
import useClickOutside from '@/hooks/useClickOutside'
import IsLoginButtons from './IsLoginButtons'
import useLoginLogout from '@/utils/useLoginLogout'

const Header = () => {
  const searchParams = useSearchParams()
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [cookies] = useCookies()
  const { refreshTokenMutation } = useLogin()
  const { isTablet } = useResponsiveSize()
  const { menuRef, handleToggleMenu, isOpenMenu } = useClickOutside()
  const { handleClick, handleCloseModal, onLogout } = useLoginLogout()

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
          {!isTablet ? (
            <>
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
                    <IsLoginButtons />
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
                          <Link
                            href={'/mypage/myprofile'}
                            className={styles.menu}
                          >
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
                  <Button type="button" onClick={handleClick} fill>
                    로그인
                  </Button>
                )}
              </>
            </>
          ) : (
            <MobileMenu />
          )}
        </div>
      </header>
    </>
  )
}

export default Header
