import styles from './chatList.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import { ChatRoomDataType } from '@/types/chat/chatDataType'

interface ChatListProps {
  data: ChatRoomDataType[]
  enterChatRoom: (roomid: number) => void
}

const ChatList = ({ data, enterChatRoom }: ChatListProps) => {
  return (
    <ul className={styles.list}>
      {data.map((item: ChatRoomDataType) => (
        <li
          className={styles.item}
          key={item.roomId}
          onClick={() => enterChatRoom(item.roomId)}
        >
          <UserProfileImg userProfile={null} width={40} height={40} />
          <p className={styles.chatTitle}>{item.title}</p>
          {/* <span className={styles.team}>4</span>
          <span className={styles.badge}>50</span> */}
        </li>
      ))}
    </ul>
  )
}

export default ChatList
