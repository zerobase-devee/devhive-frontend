import styles from './chatList.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'

const ChatList = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <UserProfileImg userProfile={null} width={40} height={40} />
        <p className={styles.chatTitle}>채팅방</p>
        <span className={styles.team}>4</span>
        <span className={styles.badge}>50</span>
      </li>
    </ul>
  )
}

export default ChatList
