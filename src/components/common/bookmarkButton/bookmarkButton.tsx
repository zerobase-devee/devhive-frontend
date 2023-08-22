'use client'

import { useState } from 'react'
import styles from './bookmarkButton.module.css'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'

const BookmarkButton = () => {
  const [bookmarkState, setBookMarkState] = useState(false)

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
