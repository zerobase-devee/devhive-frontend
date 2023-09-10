import FavoriteUserCard from './FavoriteUserCard'
import styles from './favoriteUserCard.module.css'
import FavoriteNull from '../favoriteNull/FavoriteNull'
import { getFavoriteUser } from '@/apis/mypage/favoriteUser'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import Loading from '@/components/common/loading/Loading'
import Pagination from '@/components/common/pagination/Pagination'
import { FavoriteUser } from '@/types/users/favoriteDataType'
import usePagination from '@/hooks/usePagination'

const FavoriteUserList = () => {
  const FAVORITE_USERS_SIZE = 12
  const { page, handlePageChange } = usePagination()

  const { data, error, isLoading } = useQuery(
    [REACT_QUERY_KEY.favoriteUser, page - 1],
    () => getFavoriteUser(page - 1, FAVORITE_USERS_SIZE),
  )

  if (isLoading) {
    return <Loading />
  }

  if (data.content.length === 0 && data.totalElements === 0) {
    return <FavoriteNull>북마크에 추가한 유저가 아직 없어요.</FavoriteNull>
  }

  if (error) {
    return <p>에러 발생</p>
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardListContaienr}>
        {data.content.map((item: FavoriteUser) => (
          <FavoriteUserCard
            key={item.userId}
            favoriteId={item.favoriteId}
            userId={item.userId}
            profileImage={item.profileImage}
            nickName={item.nickName}
          />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={handlePageChange}
        limit={FAVORITE_USERS_SIZE}
        total={data.totalElements}
      />
    </div>
  )
}

export default FavoriteUserList
