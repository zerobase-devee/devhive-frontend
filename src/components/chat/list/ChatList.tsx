import { fetchAccessData } from '@/utils/fetchAccessData'
import styles from './chatList.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import Loading from '@/components/common/loading/Loading'
import { ChatRoomDataType } from '@/types/chat/chatDataType'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'

const ChatList = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { data, error, isLoading } = useQuery(REACT_QUERY_KEY.chat, () =>
    fetchAccessData('/chat/room'),
  )

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>에러 발생</p>
  }

  if (!data) {
    return null
  }

  const enterChatRoom = (roomId: number) => {
    try {
      if (roomId) {
        console.log('채팅방 참여')
        const queryString = new URLSearchParams()
        queryString.set('room', String(roomId))
        router.push(pathname + '?' + queryString.toString())
      }
    } catch (error) {
      console.error(error)
    }
  }

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
