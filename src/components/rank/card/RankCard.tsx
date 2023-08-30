import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import styles from './rankCard.module.css'

interface RankCardProps {
  readonly userProfile: string | null
  readonly nickname: string
  readonly point: number
  readonly rank: number
}

const RankCard = ({ userProfile, nickname, point, rank }: RankCardProps) => {
  return (
    <div className={styles.cardContainer}>
      {rank === 0 && <span className={styles.rank}>🥇</span>}
      {rank === 1 && <span className={styles.rank}>🥈</span>}
      {rank === 2 && <span className={styles.rank}>🥉</span>}
      <UserProfileImg userProfile={userProfile} width={52} height={52} />
      <p>{nickname}</p>
      <p className={styles.point}>{point} 점</p>
    </div>
  )
}

export default RankCard
