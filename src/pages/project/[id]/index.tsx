import Container from '@/components/common/container/Container'
import ProjectDetailContent from '@/components/projectDetail/ProjectDetailContent'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const ProjectDetail = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  return (
    <Container>
      <ProjectDetailContent projectId={id} />
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

export default ProjectDetail
