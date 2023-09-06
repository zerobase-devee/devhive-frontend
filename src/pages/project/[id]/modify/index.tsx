import Container from '@/components/common/container/Container'
import WriteForm from '@/components/projectWrite/writeForm/WriteForm'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const Modify = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  console.log(id)

  const formatTeamSize = (teamSize: number) => {
    return `${teamSize}명`
  }

  return (
    <Container>
      <WriteForm
        title="야호"
        name="digh"
        development="프론트엔드"
        recruitment="온라인"
        region={null}
        content="<p>야야야양</p>"
        teamSize={formatTeamSize(3)}
        deadline={'2023-09-28'}
        techStack={[1]}
        modify
      />
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

export default Modify
