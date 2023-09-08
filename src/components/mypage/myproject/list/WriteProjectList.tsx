import styles from './projectList.module.css'
import usePagination from '@/hooks/usePagination'
import MyprojectCard from '../card/MyprojectCard'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { useQuery } from 'react-query'
import { getProjectWrite } from '@/apis/mypage/myProject'
import Loading from '@/components/common/loading/Loading'
import ListNull from '@/components/common/listNull/ListNull'
import { MyprojectDataType } from '@/types/users/myprojectDataType'
import { translateStatusToKorean } from '@/utils/projectDataToKorean'
import Pagination from '@/components/common/pagination/Pagination'

const WriteProjectList = () => {
  const PAGE_SIZE = 3
  const { page, handlePageChange } = usePagination('myproject-write')
  const { data, error, isLoading } = useQuery(
    [REACT_QUERY_KEY.projectWrite, page],
    () => getProjectWrite(page - 1, PAGE_SIZE),
  )

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>오류발생</p>
  }

  if (data.content.length === 0) {
    return (
      <ListNull
        contentText={
          <>
            <p>아직 업로드한 프로젝트가 없어요.</p>
            <p>프로젝트 공고를 올려보세요.</p>
          </>
        }
        href="/project/write"
        buttonText="프로젝트등록하기"
      />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {data.content.map((item: MyprojectDataType) => (
          <MyprojectCard
            key={item.projectId}
            link={`write/${item.projectId}`}
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

export default WriteProjectList
