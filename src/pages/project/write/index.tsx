import Container from '@/components/common/container/Container'
import WriteForm from '@/components/projectWrite/writeForm/WriteForm'
import useRequireLogin from '@/hooks/useRequireLogin'
import { withAuthUser } from '@/utils/withAuthUser'

const ProjectWrite = () => {
  useRequireLogin()

  return (
    <Container>
      <WriteForm />
    </Container>
  )
}

export const getServerSideProps = withAuthUser()

export default ProjectWrite
