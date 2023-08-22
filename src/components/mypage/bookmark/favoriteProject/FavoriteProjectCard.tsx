import Link from 'next/link'
import styles from './favoriteProjectCard.module.css'
import BookmarkButton from '@/components/common/bookmarkButton/bookmarkButton'
import { FavoriteProjectProps } from '@/types/favoriteType'

const FavoriteProjectCard = ({ projectTitle }: FavoriteProjectProps) => {
  return (
    <Link href={'#'}>
      <div className={styles.cardContainer}>
        <p className={styles.title}>{projectTitle}</p>
        <BookmarkButton />
      </div>
    </Link>
  )
}

export default FavoriteProjectCard
