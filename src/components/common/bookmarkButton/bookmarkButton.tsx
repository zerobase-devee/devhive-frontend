import { useState } from 'react'
import styles from './bookmarkButton.module.css'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'

const BookmarkButton = ({ active }: { active: boolean }) => {
  const [bookmarkState, setBookMarkState] = useState(active)

  return (
    <button
      type="button"
      className={styles.bookmarkButton}
      onClick={() => {
        setBookMarkState(!bookmarkState)
      }}
    >
      <BsFillBookmarkPlusFill
        className={`${styles.bookmarkIcon} ${
          bookmarkState === true && styles.favorite
        }`}
      />
    </button>
  )
}

export default BookmarkButton
