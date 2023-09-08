import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import DetailListContainer from '@/components/mypage/myprojectDetail/detailListContainer/DetailListContainer'
import { withAuthUser } from '@/utils/withAuthUser'

const WriteProject = () => {
  return (
    <MypageLayout>
      <Title title="내 프로젝트" />
      <DetailListContainer isLeader={true} />
    </MypageLayout>
  )
}

export const getServerSideProps = withAuthUser()

export default WriteProject
