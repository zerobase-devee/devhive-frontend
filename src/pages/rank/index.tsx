import Container from '@/components/common/container/Container'
import Title from '@/components/common/title/Title'
import RankList from '@/components/rank/list/RankList'
import { GetServerSideProps } from 'next'

const Rank = () => {
  return (
    <Container>
      <Title title="랭킹" />
      <RankList />
    </Container>
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

export default Rank
