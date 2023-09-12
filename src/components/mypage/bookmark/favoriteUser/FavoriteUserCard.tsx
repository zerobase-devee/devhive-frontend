import Link from 'next/link'
import styles from './favoriteUserCard.module.css'
import { FavoriteUser } from '@/types/users/favoriteDataType'
import BookmarkButton from '@/components/common/bookmarkButton/bookmarkButton'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'

const FavoriteUserCard = ({
  favoriteId,
  nickName,
  profileImage,
  userId,
}: FavoriteUser) => {
  return (
    <Link href={`/profile/${userId}`}>
      <div className={styles.card}>
        <BookmarkButton userId={userId} favoriteId={favoriteId} active={true} />
        <div className={styles.imgArea}>
          <UserProfileImg userProfile={profileImage} width={52} height={52} />
        </div>
        <p className={styles.nickname}>{nickName}</p>
      </div>
    </Link>
  )
}

export default FavoriteUserCard
