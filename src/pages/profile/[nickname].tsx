import Container from '@/components/common/container/Container'
import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()
  const { nickname } = router.query
  return (
    <Container>
      <p>Nickname: {nickname}</p>
    </Container>
  )
}

export default Profile
