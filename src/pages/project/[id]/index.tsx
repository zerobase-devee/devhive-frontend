import Container from '@/components/common/container/Container'
import ProjectDetailContent from '@/components/projectDetail/ProjectDetailContent'
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

export default ProjectDetail
