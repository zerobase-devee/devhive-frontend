import Link from 'next/link'
import styles from './favoriteProjectCard.module.css'
import BookmarkButton from '@/components/common/bookmarkButton/bookmarkButton'
import { FavoriteProject } from '@/types/users/favoriteDataType'

const FavoriteProjectCard = ({
  title,
  projectId,
  bookmarkId,
}: FavoriteProject) => {
  return (
    <Link href={`/project/${projectId}`}>
      <div className={styles.cardContainer}>
        <p className={styles.title}>{title}</p>
        <BookmarkButton
          active={true}
          bookmarkId={bookmarkId}
          projectId={projectId}
        />
      </div>
    </Link>
  )
}

export default FavoriteProjectCard
