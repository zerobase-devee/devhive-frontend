import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import PasswordForm from '@/components/mypage/passwordForm/PasswordForm'
import useRequireLogin from '@/hooks/useRequireLogin'
import { GetServerSideProps } from 'next'

const UserModify = () => {
  useRequireLogin()

  return (
    <MypageLayout>
      <Title title="비밀번호 변경" />
      <PasswordForm />
    </MypageLayout>
  )
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

export default UserModify
