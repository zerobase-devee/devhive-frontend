import { useRouter } from 'next/router'
import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'

const WriteProject = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <MypageLayout>
      <Title title="내 프로젝트" />
      <div>dynamic Id : {id}</div>
    </MypageLayout>
  )
}

export default WriteProject
