import { IoMdClose } from 'react-icons/io'
import styles from './alarm.module.css'
import Link from 'next/link'

const Alarm = () => {
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <Link href={'/'} className={styles.item}>
        <div className={styles.top}>
          <p className={styles.time}>createdDate</p>
          <button
            className={styles.deleteBtn}
            onClick={(e) => handleDeleteClick(e)}
          >
            <IoMdClose />
          </button>
        </div>
        <div>
          <span className={styles.bold}>강조</span> content
        </div>
      </Link>
    </div>
  )
}

export default Alarm
