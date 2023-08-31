import Link from 'next/link'
import styles from './favoriteProjectCard.module.css'
import BookmarkButton from '@/components/common/bookmarkButton/bookmarkButton'
import { FavoriteProjectListProps } from '@/types/mypageDataType'

const FavoriteProjectCard = ({
  projectTitle,
  projectId,
}: FavoriteProjectListProps) => {
  return (
    <Link href={`/project/${projectId}`}>
      <div className={styles.cardContainer}>
        <p className={styles.title}>{projectTitle}</p>
        <BookmarkButton active={true} />
      </div>
    </Link>
  )
}

export default FavoriteProjectCard
