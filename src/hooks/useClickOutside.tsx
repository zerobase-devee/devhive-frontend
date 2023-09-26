import { useEffect, useRef, useState } from 'react'

const useClickOutside = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenAlarm, setIsOpenAlarm] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const alarmRef = useRef<HTMLDivElement | null>(null)

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

  return {
    menuRef,
    alarmRef,
    handleToggleAlarm,
    handleToggleMenu,
    isOpenMenu,
    isOpenAlarm,
  }
}

export default useClickOutside
