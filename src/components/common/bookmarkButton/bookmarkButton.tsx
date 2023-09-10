import { useState } from 'react'
import styles from './bookmarkButton.module.css'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'
import useFavorite from '@/hooks/queries/useFavorite'

const BookmarkButton = ({
  active,
  userId,
  projectId,
  bookmarkId,
  favoriteId,
}: {
  active: boolean
  userId?: number | string
  projectId?: number
  bookmarkId?: number | null
  favoriteId?: number | null
}) => {
  const [isFavorite, setIsFavorite] = useState(active)

  const {
    addFavoriteUserMutation,
    deleteFavoriteUserMutation,
    addFavoriteProjectMutation,
    deleteFavoriteProjectMutation,
  } = useFavorite()
  const handleBookmark = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault()
      setIsFavorite(!isFavorite)
      if (active === false) {
        if (userId) {
          await addFavoriteUserMutation.mutateAsync(userId)
        } else if (projectId) {
          await addFavoriteProjectMutation.mutateAsync(projectId)
        }
      } else {
        if (favoriteId) {
          await deleteFavoriteUserMutation.mutateAsync(favoriteId)
        } else if (bookmarkId) {
          await deleteFavoriteProjectMutation.mutateAsync(bookmarkId)
        } else {
          console.log('실패')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      type="button"
      className={styles.bookmarkButton}
      onClick={(event) => handleBookmark(event)}
    >
      <BsFillBookmarkPlusFill
        className={`${styles.bookmarkIcon} ${
          active === true && styles.favorite
        }`}
      />
    </button>
  )
}

export default BookmarkButton
