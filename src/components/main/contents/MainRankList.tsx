import { useEffect, useState } from 'react'
import styles from './list.module.css'
import { RankDataType } from '@/types/rank/rankDataType'
import { RankData } from 'public/data/rankData'
import RankCard from '@/components/rank/card/RankCard'
import LinkButton from '@/components/common/button/LinkButton'

const MainRankList = () => {
  const LIMIT_CARD_NUM = 3
  const [rankData, setRankData] = useState<RankDataType[] | []>([])

  useEffect(() => {
    setRankData(RankData)
  }, [])

  return rankData.length === 0 ? (
    <div className={styles.null}>아직 랭킹이 없어요.</div>
  ) : (
    <>
      <div className={styles.list}>
        {rankData.slice(0, LIMIT_CARD_NUM).map((item, index) => (
          <RankCard
            rank={index}
            userId={item.userId}
            key={item.userId}
            profileImage={item.profileImage}
            rankPoint={item.rankPoint}
            nickname={item.nickname}
          />
        ))}
      </div>
      <LinkButton href="/rank">랭킹 더보기</LinkButton>
    </>
  )
}

export default MainRankList
