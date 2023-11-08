import Chatting from '@/components/chat/Chatting'
import useRequireLogin from '@/hooks/useRequireLogin'
import { withAuthUser } from '@/utils/withAuthUser'

const Chat = () => {
  useRequireLogin()
  return <Chatting />
}

export const getServerSideProps = withAuthUser()

export default Chat
