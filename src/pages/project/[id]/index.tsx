import Container from '@/components/common/container/Container'
import ProjectDetailContent from '@/components/projectDetail/ProjectDetailContent'
import { withAuthUser } from '@/utils/withAuthUser'
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

export const getServerSideProps = withAuthUser()

export default ProjectDetail
