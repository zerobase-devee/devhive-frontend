import Container from '@/components/common/container/Container'
import Title from '@/components/common/title/Title'
import RankList from '@/components/rank/list/RankList'

const Rank = () => {
  return (
    <Container>
      <Title title="랭킹" />
      <RankList />
    </Container>
  )
}

export default Rank
