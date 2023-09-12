import ProfileContent from '@/components/profile/ProfileContent'
import { withAuthUser } from '@/utils/withAuthUser'
import { useRouter } from 'next/router'

const UserProfile = () => {
  const router = useRouter()
  const id = Number(router.query.userId)

  return <ProfileContent userId={id} />
}

export const getServerSideProps = withAuthUser()

export default UserProfile
