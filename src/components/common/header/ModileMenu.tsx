import Link from 'next/link'
import styles from './modileMenu.module.css'
import { useRecoilValue } from 'recoil'
import { loginState } from '@/recoil/loginState'
import IsLoginButtons from './IsLoginButtons'
import { IoMdClose } from 'react-icons/io'
import { BiMenu } from 'react-icons/bi'
import useModal from '@/hooks/useModal'
import useLoginLogout from '@/utils/useLoginLogout'
import Button from '../button/Button'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import MypageMenu from '@/components/mypage/common/menu/MypageMenu'

const MobileMenu = () => {
  const isLogin = useRecoilValue(loginState)
  const { openModal, handleOpenModal, handleCloseModal } = useModal()
  const { handleClick, onLogout } = useLoginLogout()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      handleCloseModal()
    }
    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      {isLogin && !openModal && <IsLoginButtons />}
      {openModal ? (
        <button
          className={styles.menuIcon}
          type="button"
          onClick={handleCloseModal}
        >
          <IoMdClose />
        </button>
      ) : (
        <button
          className={styles.menuIcon}
          type="button"
          onClick={handleOpenModal}
        >
          <BiMenu />
        </button>
      )}
      {openModal && (
        <div className={styles.menu}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <Link href="/project">프로젝트</Link>
              </li>
              <li>
                <Link href="/rank">랭킹</Link>
              </li>
              {isLogin && (
                <>
                  <li>
                    <Link href={'/project/write'}>프로젝트올리기</Link>
                  </li>
                  <li>
                    <ul>
                      <p>마이페이지</p>
                      <MypageMenu />
                    </ul>
                  </li>
                </>
              )}
            </ul>
            {!isLogin ? (
              <Button type="button" onClick={handleClick} fill>
                로그인
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  handleCloseModal()
                  onLogout()
                }}
              >
                로그아웃
              </Button>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
