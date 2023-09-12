import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import PasswordForm from '@/components/mypage/passwordForm/PasswordForm'
import useRequireLogin from '@/hooks/useRequireLogin'
import { withAuthUser } from '@/utils/withAuthUser'

const UserModify = () => {
  useRequireLogin()

  return (
    <MypageLayout>
      <Title title="비밀번호 변경" />
      <PasswordForm />
    </MypageLayout>
  )
}

export const getServerSideProps = withAuthUser()

export default UserModify
