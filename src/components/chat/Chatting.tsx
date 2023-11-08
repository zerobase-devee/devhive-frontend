import { useState } from 'react'
import styles from './chatting.module.css'
import ChatList from './list/ChatList'
import ChattingRoom from './room/ChattingRoom'
import { fetchAccessData } from '@/utils/fetchAccessData'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import Loading from '@/components/common/loading/Loading'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { BsFillChatDotsFill } from 'react-icons/bs'

const Chatting = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedChat, setSelectedChat] = useState(false)
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
        const queryString = new URLSearchParams()
        queryString.set('room', String(roomId))
        router.push(pathname + '?' + queryString.toString())
        setSelectedChat(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {data.length === 0 ? (
        <div className={styles.null}>
          <BsFillChatDotsFill />
          <p>아직 생성된 채팅방이 없어요.</p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.chatList}>
            <h2>채팅방</h2>
            <ChatList data={data} enterChatRoom={enterChatRoom} />
          </div>
          <div className={styles.chattingRoom}>
            <ChattingRoom selectedChat={selectedChat} />
          </div>
        </div>
      )}
    </>
  )
}

export default Chatting
