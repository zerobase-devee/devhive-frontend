import React from 'react'
import styles from './Ranking.module.css'
import { FaUserCircle } from 'react-icons/fa'

interface IRankingProps {
  rangking: any
}
export default function RankingCard({ rangking }: IRankingProps) {
  return (
    <li className={styles.rankingCard}>
      <div className={styles.icon}>
        <img
          src={`/images/icon_ranking/icon_ranking${rangking.ranking}.png`}
          alt=""
        />
      </div>
      <div className={styles.user}>
        <span className={styles.profile}>
          <FaUserCircle />
        </span>
        <span className={styles.name}>{rangking.username}</span>
      </div>
      <div className={styles.point}>1000점</div>
    </li>
  )
}
