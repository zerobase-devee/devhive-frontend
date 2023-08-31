import ProfileContent from '@/components/profile/ProfileContent'
import { useRouter } from 'next/router'

const UserProfile = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  return <ProfileContent userId={id} />
}

export default UserProfile
