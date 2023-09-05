import Link from 'next/link'
import styles from './favoriteUserCard.module.css'
import BookmarkButton from '@/components/common/bookmarkButton/bookmarkButton'
import { FavoriteUserProps } from '@/types/mypageDataType'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'

const FavoriteUserCard = ({ userNickname, userProfile }: FavoriteUserProps) => {
  return (
    <Link href={`/profile/@${userNickname}`}>
      <div className={styles.container}>
        <BookmarkButton active={true} />
        <div className={styles.imgArea}>
          <UserProfileImg userProfile={userProfile} width={52} height={52} />
        </div>
        <p className={styles.nickname}>{userNickname}</p>
      </div>
    </Link>
  )
}

export default FavoriteUserCard
