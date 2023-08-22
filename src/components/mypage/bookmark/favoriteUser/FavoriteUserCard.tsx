import Link from 'next/link'
import styles from './favoriteUserCard.module.css'
import BookmarkButton from '@/components/common/bookmarkButton/bookmarkButton'
import { FavoriteUserProps } from '@/types/favoriteType'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'

const FavoriteUserCard = ({ userNickname, userProfile }: FavoriteUserProps) => {
  return (
    <Link href={'#'}>
      <div className={styles.container}>
        <BookmarkButton />
        <div className={styles.imgArea}>
          <UserProfileImg userProfile={userProfile} width={52} height={52} />
        </div>
        <p className={styles.nickname}>{userNickname}</p>
      </div>
    </Link>
  )
}

export default FavoriteUserCard
