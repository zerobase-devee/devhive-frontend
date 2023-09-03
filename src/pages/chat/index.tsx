import Chatting from '@/components/chat/Chatting'
import { GetServerSideProps } from 'next'

const Chat = () => {
  return <Chatting />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const accessToken = req.cookies.accessToken || null
  const refreshToken = req.cookies.refreshToken || null
  const isLogin = accessToken !== null && refreshToken !== null ? true : false

  return {
    props: {
      initialAuth: isLogin,
    },
  }
}

export default Chat
