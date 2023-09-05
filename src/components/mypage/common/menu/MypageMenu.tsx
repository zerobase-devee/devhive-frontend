import Link from 'next/link'
import styles from './mypageMenu.module.css'
import { usePathname } from 'next/navigation'
import { isLocalLogin } from '@/apis/mypage/isLocalLogin'
import {
  MY_PAGE_MENU_LIST,
  MY_PAGE_MENU_LIST_LOCAL_LOGIN,
} from '@/constants/myPageMenu'
import { useEffect, useState } from 'react'

interface MypageMenu {
  path: string
  initUrl?: string
  label: string
}

const MypageMenu = () => {
  const pathname = usePathname()
  const [menuItems, setMenuItems] = useState<MypageMenu[]>([])

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const isLocalLoginState = await isLocalLogin()
        const items = isLocalLoginState
          ? MY_PAGE_MENU_LIST_LOCAL_LOGIN
          : MY_PAGE_MENU_LIST
        setMenuItems(items)
      } catch (error) {
        console.error('API 요청 실패', error)
      }
    }

    fetchMenuItems()
  }, [])

  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.path}>
          <Link
            href={`${menuItem.path}${menuItem.initUrl ? menuItem.initUrl : ''}`}
            className={`${styles.menuItem} ${
              pathname && pathname.includes(menuItem.path) && styles.point
            }`}
          >
            {menuItem.label}
          </Link>
        </li>
      ))}
    </>
  )
}

export default MypageMenu
