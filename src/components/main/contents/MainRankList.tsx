import styles from './list.module.css'
import { RankDataType } from '@/types/rank/rankDataType'
import RankCard from '@/components/rank/card/RankCard'
import LinkButton from '@/components/common/button/LinkButton'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { getRanks } from '@/apis/rank/rank'
import SkeletonCard from '@/components/common/loading/SkeletonCard'

const MainRankList = () => {
  const PAGE_SIZE = 3

  const { data, error, isLoading } = useQuery(REACT_QUERY_KEY.rank, () =>
    getRanks(0, PAGE_SIZE),
  )
  if (isLoading) {
    return (
      <div className={styles.list}>
        {new Array(PAGE_SIZE).fill(0).map((_, index) => (
          <SkeletonCard key={`Rank${index}`} />
        ))}
      </div>
    )
  }
  if (error || data.content === undefined) {
    return <p>에러 발생</p>
  }

  if (data.content.length === 0) {
    return <div className={styles.null}>아직 랭킹이 없어요.</div>
  }

  return (
    <>
      <div className={styles.rankList}>
        {data.content.map((item: RankDataType, index: number) => (
          <RankCard
            userBadges={item.userBadges}
            rank={index}
            userId={item.userId}
            key={item.userId}
            profileImage={item.profileImage}
            rankPoint={item.rankPoint}
            nickName={item.nickName}
          />
        ))}
      </div>
      <LinkButton href="/rank">랭킹 더보기</LinkButton>
    </>
  )
}

export default MainRankList
