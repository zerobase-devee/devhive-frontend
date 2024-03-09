import { useState } from 'react'
import styles from './bookmarkButton.module.css'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'
import InfoModal from '../modal/InfoModal'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { loginState } from '@/recoil/loginState'
// import useFavorite from '@/hooks/queries/useFavorite'

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
  const router = useRouter()
  const isLogin = useRecoilValue(loginState)
  const [showModal, setShowModal] = useState(false)

  // const {
  //   addFavoriteUserMutation,
  //   deleteFavoriteUserMutation,
  //   addFavoriteProjectMutation,
  //   deleteFavoriteProjectMutation,
  // } = useFavorite()
  const handleBookmark = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault()
      if (!isLogin) {
        setShowModal(true)
      } else if (active === false) {
        setIsFavorite(!isFavorite)

        // 북마크 등록 로직
        //   if (userId) {
        //     await addFavoriteUserMutation.mutateAsync(userId)
        //   } else if (projectId) {
        //     await addFavoriteProjectMutation.mutateAsync(projectId)
        //   }
        // } else {
        //   if (favoriteId) {
        //     await deleteFavoriteUserMutation.mutateAsync(favoriteId)
        //   } else if (bookmarkId) {
        //     await deleteFavoriteProjectMutation.mutateAsync(bookmarkId)
        //   }
      }
    } catch (error) {
      console.error(error, ': API 요청 오류')
    }
  }

  return (
    <>
      {showModal && (
        <InfoModal
          buttonText="로그인"
          onClick={() => {
            setShowModal(false)
            router.push('/?user=login')
          }}
        >
          로그인이 필요한 서비스입니다. <br />
          로그인해주세요.
        </InfoModal>
      )}

      <button
        type="button"
        className={styles.bookmarkButton}
        onClick={(event) => handleBookmark(event)}
      >
        <BsFillBookmarkPlusFill
          className={`${styles.bookmarkIcon} ${
            isFavorite === true && styles.favorite
          }`}
        />
      </button>
    </>
  )
}

export default BookmarkButton
