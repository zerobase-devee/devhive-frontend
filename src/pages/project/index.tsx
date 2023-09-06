import Container from '@/components/common/container/Container'
import Title from '@/components/common/title/Title'
import ProjectList from '@/components/project/list/ProjectList'
import { GetServerSideProps } from 'next'

const Project = () => {
  return (
    <Container>
      <Title title="프로젝트" />
      <ProjectList />
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
export default Project
