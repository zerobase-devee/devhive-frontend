import styles from './chatting.module.css'
import ChatList from './list/ChatList'
import ChattingRoom from './room/ChattingRoom'

const Chatting = () => {
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
