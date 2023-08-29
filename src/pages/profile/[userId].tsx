import Container from '@/components/common/container/Container'
import ProfileContent from '@/components/profile/ProfileContent'
import { useRouter } from 'next/router'

const UserProfile = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  return (
    <Container>
      <ProfileContent userId={id} />
    </Container>
  )
}

export default UserProfile
