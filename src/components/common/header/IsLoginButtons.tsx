import useClickOutside from '@/hooks/useClickOutside'
import styles from './Header.module.css'
import { BiSolidMessageAltDetail } from 'react-icons/bi'
import Link from 'next/link'
import Alarm from '@/components/alarm/Alarm'

const IsLoginButtons = () => {
  const { alarmRef, handleToggleAlarm, isOpenAlarm } = useClickOutside()

  return (
    <>
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
    </>
  )
}

export default IsLoginButtons
