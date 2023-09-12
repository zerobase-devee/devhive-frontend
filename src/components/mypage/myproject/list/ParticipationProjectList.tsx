import styles from './projectList.module.css'
import MyprojectCard from '../card/MyprojectCard'
import usePagination from '@/hooks/usePagination'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { getProjectParticipation } from '@/apis/mypage/myProject'
import ListNull from '@/components/common/listNull/ListNull'
import { MyprojectDataType } from '@/types/users/myprojectDataType'
import { translateStatusToKorean } from '@/utils/projectDataToKorean'
import Pagination from '@/components/common/pagination/Pagination'
import Loading from '@/components/common/loading/Loading'

const ParticipationProjectList = () => {
  const PAGE_SIZE = 3
  const { page, handlePageChange } = usePagination('myproject-participation')

  const { data, error, isLoading } = useQuery(
    [REACT_QUERY_KEY.projectParticipation, page],
    () => getProjectParticipation(page - 1, PAGE_SIZE),
  )

  if (isLoading) {
    return <Loading />
  }

  if (data.content.length === 0) {
    return (
      <ListNull
        contentText={
          <>
            <p>아직 참여한 프로젝트가 없어요.</p>
            <p>프로젝트 공고를 확인해보세요.</p>
          </>
        }
        href="/project"
        buttonText="프로젝트보러가기"
      />
    )
  }

  if (error) {
    return <p>오류발생</p>
  }

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {data.content.map((item: MyprojectDataType) => (
          <MyprojectCard
            key={item.projectId}
            link={`${item.projectId}`}
            projectStatus={translateStatusToKorean(item.status)}
            projectTitle={item.name}
          />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={handlePageChange}
        limit={PAGE_SIZE}
        total={data.totalElements}
      />
    </div>
  )
}

export default ParticipationProjectList
