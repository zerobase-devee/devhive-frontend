import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import styles from './rankCard.module.css'
import Link from 'next/link'
import { RankDataType } from '@/types/rank/rankDataType'
import Image from 'next/image'

interface RankCardProps extends RankDataType {
  readonly rank: number
}

const RankCard = ({
  profileImage,
  nickName,
  rankPoint,
  rank,
  userId,
  userBadges,
}: RankCardProps) => {
  return (
    <Link href={`/profile/${userId}`} className={styles.cardContainer}>
      <div className={styles.rankInfo}>
        <UserProfileImg userProfile={profileImage} width={60} height={60} />
        <div className={styles.userInfo}>
          <p>{nickName}</p>
          <p className={styles.point}>{rankPoint} 점</p>
        </div>
        {rank === 0 && <span className={styles.rank}>🥇</span>}
        {rank === 1 && <span className={styles.rank}>🥈</span>}
        {rank === 2 && <span className={styles.rank}>🥉</span>}
      </div>
      {userBadges && userBadges.length !== 0 ? (
        <div className={styles.badgeList}>
          {userBadges.map((item) => (
            <div key={item.badgeDto.id} className={styles.badgeItem}>
              <Image
                className={styles.badgeImg}
                src={item.badgeDto.image}
                alt={item.badgeDto.name}
                width={20}
                height={20}
              />
              <span>{item.badgeDto.name}・</span>
              <span>누적점수: {item.score}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.scoreNull}>아직 업적 뱃지가 없어요</div>
      )}
    </Link>
  )
}

export default RankCard
