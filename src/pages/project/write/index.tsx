import Container from '@/components/common/container/Container'
import WriteForm from '@/components/projectWrite/writeForm/WriteForm'
import { GetServerSideProps } from 'next'

const ProjectWrite = () => {
  return (
    <Container>
      <WriteForm />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const accessToken = req.cookies.accessToken || null
  const refreshToken = req.cookies.refreshToken || null
  const isLogin = accessToken !== null && refreshToken !== null ? true : false
  const userInfo = req.cookies.userInfo || null
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : ''

  return {
    props: {
      initialAuth: isLogin,
      initialUserInfo: parsedUserInfo,
    },
  }
}

export default ProjectWrite
