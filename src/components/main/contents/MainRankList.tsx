import { useEffect, useState } from 'react'
import styles from './list.module.css'
import { RankDataType } from '@/types/rankDataType'
import { RankData } from 'public/data/rankData'
import RankCard from '@/components/rank/card/RankCard'

const MainRankList = () => {
  const [rankData, setRankData] = useState<RankDataType[] | []>([])

  useEffect(() => {
    setRankData(RankData)
  }, [])

  return (
    <div className={styles.list}>
      {rankData.slice(0, 3).map((item, index) => (
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
  )
}

export default MainRankList
