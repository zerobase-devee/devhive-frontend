import NicknameChangeInfoModal from '@/components/auth/sns/NicknameChangeInfoModal'
import Container from '@/components/common/container/Container'
import ProjectDetailContent from '@/components/projectDetail/ProjectDetailContent'
import useNicknameChangeModal from '@/hooks/useNicknameChangeModal'
import { withAuthUser } from '@/utils/withAuthUser'
import { useRouter } from 'next/router'

const ProjectDetail = () => {
  const router = useRouter()
  const id = Number(router.query.id)
  const { openModal } = useNicknameChangeModal()

  return (
    <>
      {openModal && <NicknameChangeInfoModal />}
      <Container>
        <ProjectDetailContent projectId={id} />
      </Container>
    </>
  )
}

export const getServerSideProps = withAuthUser()

export default ProjectDetail
