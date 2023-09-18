import NicknameChangeInfoModal from '@/components/auth/sns/NicknameChangeInfoModal'
import Container from '@/components/common/container/Container'
import WriteForm from '@/components/projectWrite/writeForm/WriteForm'
import useNicknameChangeModal from '@/hooks/useNicknameChangeModal'
import useRequireLogin from '@/hooks/useRequireLogin'
import { withAuthUser } from '@/utils/withAuthUser'

const ProjectWrite = () => {
  useRequireLogin()
  const { openModal } = useNicknameChangeModal()

  return (
    <>
      {openModal && <NicknameChangeInfoModal />}
      <Container>
        <WriteForm />
      </Container>
    </>
  )
}

export const getServerSideProps = withAuthUser()

export default ProjectWrite
