import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import styles from './rankCard.module.css'
import Link from 'next/link'
import { RankDataType } from '@/types/rankDataType'

interface RankCardProps extends RankDataType {
  readonly rank: number
}

const RankCard = ({
  profileImage,
  nickname,
  rankPoint,
  rank,
  userId,
}: RankCardProps) => {
  return (
    <Link href={`/profile/${userId}`} className={styles.cardContainer}>
      {rank === 0 && <span className={styles.rank}>🥇</span>}
      {rank === 1 && <span className={styles.rank}>🥈</span>}
      {rank === 2 && <span className={styles.rank}>🥉</span>}
      <UserProfileImg userProfile={profileImage} width={52} height={52} />
      <p>{nickname}</p>
      <p className={styles.point}>{rankPoint} 점</p>
    </Link>
  )
}

export default RankCard
