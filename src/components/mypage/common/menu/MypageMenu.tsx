'use client'

import Link from 'next/link'
import styles from './mypageMenu.module.css'
import { usePathname } from 'next/navigation'

const MypageMenu = () => {
  const pathname = usePathname()
  const menuItems = [
    { path: '/mypage/myprofile', label: '내 프로필' },
    { path: '/mypage/myproject', label: '내 프로젝트' },
    { path: '/mypage/bookmark', label: '북마크' },
    { path: '/mypage/usermodify', label: '비밀번호 변경' },
  ]

  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.path}>
          <Link
            href={menuItem.path}
            className={`${styles.menuItem} ${
              pathname === menuItem.path && styles.point
            } `}
          >
            {menuItem.label}
          </Link>
        </li>
      ))}
    </>
  )
}

export default MypageMenu