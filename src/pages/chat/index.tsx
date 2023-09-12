import Chatting from '@/components/chat/Chatting'
import { withAuthUser } from '@/utils/withAuthUser'

const Chat = () => {
  return <Chatting />
}

export const getServerSideProps = withAuthUser()

export default Chat
