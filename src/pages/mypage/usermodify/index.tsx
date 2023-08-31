import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import PasswordForm from '@/components/mypage/passwordForm/PasswordForm'

const UserModify = () => {
  return (
    <MypageLayout>
      <Title title="비밀번호 변경" />
      <PasswordForm />
    </MypageLayout>
  )
}

export default UserModify
