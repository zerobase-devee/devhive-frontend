import ProfileContent from '@/components/profile/ProfileContent'
import { withAuthUser } from '@/utils/withAuthUser'
import { usePathname } from 'next/navigation'

const UserProfile = () => {
  const pathname = usePathname()
  const startIndex = pathname.lastIndexOf('/') + 1
  const id = pathname.slice(startIndex)

  return <ProfileContent userId={id} />
}

export const getServerSideProps = withAuthUser()

export default UserProfile
