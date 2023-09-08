import { useEffect, useState } from 'react'
import styles from './list.module.css'
import { RankDataType } from '@/types/rank/rankDataType'
import { RankData } from 'public/data/rankData'
import RankCard from '@/components/rank/card/RankCard'
import LinkButton from '@/components/common/button/LinkButton'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { getRanks } from '@/apis/rank/rank'
import Loading from '@/components/common/loading/Loading'

const MainRankList = () => {
  const PAGE_SIZE = 3

  const { data, error, isLoading } = useQuery(REACT_QUERY_KEY.rank, () =>
    getRanks(0, PAGE_SIZE),
  )

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <div className={styles.null}>아직 랭킹이 없어요.</div>
  }

  if (error) {
    return <p>에러 발생</p>
  }

  return (
    <>
      <div className={styles.list}>
        {data.map((item: RankDataType) => (
          <RankCard
            rank={item.rank}
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
