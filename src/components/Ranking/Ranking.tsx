import React from 'react'
import RankingCard from './RankingCard'
import styles from './Ranking.module.css'

const rankingData = [
  { id: 1, ranking: 1, username: 'heysunny612', point: 10000 },
  { id: 1, ranking: 2, username: 'sunshie', point: 1350 },
  { id: 1, ranking: 3, username: 'kkulbarbie', point: 1200 },
]

export default function Ranking() {
  return (
    <ul className={styles.ranking}>
      {rankingData.map((rangking) => (
        <RankingCard key={rangking.id} rangking={rangking} />
      ))}
    </ul>
  )
}
