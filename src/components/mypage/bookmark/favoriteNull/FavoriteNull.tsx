import styles from './favoriteNull.module.css'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'

const FavoriteNull = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <BsFillBookmarkPlusFill />
      <p>{children}</p>
    </div>
  )
}

export default FavoriteNull
