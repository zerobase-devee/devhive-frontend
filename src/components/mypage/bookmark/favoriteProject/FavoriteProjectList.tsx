import styles from './favoriteProjectCard.module.css'
import FavoriteProjectCard from './FavoriteProjectCard'
import FavoriteNull from '../favoriteNull/FavoriteNull'
import usePagination from '@/hooks/usePagination'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { getFavoriteProject } from '@/apis/mypage/favoriteProject'
import Loading from '@/components/common/loading/Loading'
import { FavoriteProject } from '@/types/users/favoriteDataType'
import Pagination from '@/components/common/pagination/Pagination'
import { useRecoilValue } from 'recoil'
import { deleteFavoriteProjectIdState } from '@/recoil/deleteBookmarkId'

const FavoriteProjectList = () => {
  const FAVORITE_PROJECT_SIZE = 12
  const { page, handlePageChange } = usePagination()
  const deletedFavoriteId = useRecoilValue(deleteFavoriteProjectIdState)
  const { data, error, isLoading, refetch } = useQuery(
    REACT_QUERY_KEY.favoriteProject,
    () => getFavoriteProject(page - 1, FAVORITE_PROJECT_SIZE),
    {
      staleTime: 1000,
    },
  )

  if (isLoading) {
    return <Loading />
  }

  if (data.content.length === 0 && data.totalElements === 0) {
    return <FavoriteNull>북마크에 추가한 프로젝트가 아직 없어요.</FavoriteNull>
  }

  if (error) {
    return <p>에러 발생</p>
  }

  const filteredData = data?.content.filter((item: FavoriteProject) => {
    refetch()
    return item.bookmarkId !== deletedFavoriteId
  })

  return (
    <div className={styles.container}>
      <div className={styles.cardListContaienr}>
        {filteredData.map((item: FavoriteProject) => (
          <FavoriteProjectCard
            bookmarkId={item.bookmarkId}
            key={item.projectId}
            projectId={item.projectId}
            title={item.title}
          />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={handlePageChange}
        limit={FAVORITE_PROJECT_SIZE}
        total={data.totalElements}
      />
    </div>
  )
}

export default FavoriteProjectList
