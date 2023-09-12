import { useEffect } from 'react'
import styles from './chatting.module.css'
import ChatList from './list/ChatList'
import ChattingRoom from './room/ChattingRoom'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { fetchAccessData } from '@/utils/fetchAccessData'
import { io } from 'socket.io-client'

const Chatting = () => {
  const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL_BASIC
  useEffect(() => {
    const socket = io(`http://ws:${SERVER_URL}/chat`)
    socket.on('connect', () => {
      console.log('Connected to server')
      console.log('채팅')
    })
    socket.on('message', (data) => {
      console.log('새로운 메시지:', data)
    })

    return () => {
      socket.disconnect()
    }
  }, [SERVER_URL])

  const { data, error, isLoading } = useQuery(REACT_QUERY_KEY.chat, () =>
    fetchAccessData('/chat/room'),
  )

  console.log('chat: ', data)

  return (
    <div className={styles.container}>
      <div className={styles.chatList}>
        <h2>채팅방</h2>
        <ChatList />
      </div>
      <div className={styles.chattingRoom}>
        <ChattingRoom />
      </div>
    </div>
  )
}

export default Chatting
