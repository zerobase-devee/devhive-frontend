import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import DetailListContainer from '@/components/mypage/myprojectDetail/detailListContainer/DetailListContainer'

const WriteProject = () => {
  return (
    <MypageLayout>
      <Title title="내 프로젝트" />
      <DetailListContainer isLeader={false} />
    </MypageLayout>
  )
}

export default WriteProject
