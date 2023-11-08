import styles from './isLoginButtons.module.css'
import useClickOutside from '@/hooks/useClickOutside'
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
        <BiSolidMessageAltDetail className={styles.icon} />
      </Link>
    </>
  )
}

export default IsLoginButtons
