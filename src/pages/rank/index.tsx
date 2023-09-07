import Container from '@/components/common/container/Container'
import Title from '@/components/common/title/Title'
import RankList from '@/components/rank/list/RankList'
import { withAuthUser } from '@/utils/withAuthUser'

const Rank = () => {
  return (
    <Container>
      <Title title="랭킹" />
      <RankList />
    </Container>
  )
}

export const getServerSideProps = withAuthUser()

export default Rank
