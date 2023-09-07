import Container from '@/components/common/container/Container'
import Title from '@/components/common/title/Title'
import ProjectList from '@/components/project/list/ProjectList'
import { withAuthUser } from '@/utils/withAuthUser'

const Project = () => {
  return (
    <Container>
      <Title title="프로젝트" />
      <ProjectList />
    </Container>
  )
}

export const getServerSideProps = withAuthUser()

export default Project
