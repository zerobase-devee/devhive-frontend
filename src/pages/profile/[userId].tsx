import ProfileContent from '@/components/profile/ProfileContent'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const UserProfile = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  return <ProfileContent userId={id} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const accessToken = req.cookies.accessToken || null
  const refreshToken = req.cookies.refreshToken || null
  const isLogin = accessToken !== null && refreshToken !== null ? true : false

  return {
    props: {
      initialAuth: isLogin,
    },
  }
}

export default UserProfile
