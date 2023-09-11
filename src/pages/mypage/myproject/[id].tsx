import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import DetailListContainer from '@/components/mypage/myprojectDetail/detailListContainer/DetailListContainer'
import useRequireLogin from '@/hooks/useRequireLogin'
import { withAuthUser } from '@/utils/withAuthUser'

const MyprojectDetail = () => {
  useRequireLogin()

  return (
    <MypageLayout>
      <Title title="내 프로젝트" />
      <DetailListContainer />
    </MypageLayout>
  )
}

export const getServerSideProps = withAuthUser()

export default MyprojectDetail
