import styles from './projectList.module.css'
import MyprojectCard from '../card/MyprojectCard'
import Pagination from '@/components/common/pagination/Pagination'
import { myprojectDataType } from '@/types/mypageDataType'
import { useRecoilState } from 'recoil'
import { paginationState } from '@/recoil/mypagePaginationState'

const ProjectList = ({
  link,
  data,
  paginationKey,
}: {
  link: string
  data: myprojectDataType[]
  paginationKey: string
}) => {
  const [pagination, setPagination] = useRecoilState(paginationState)

  const limit = 3
  const currentPage = pagination[paginationKey] || 1
  const offset = (currentPage - 1) * limit

  const handlePageChange = (newPage: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      [paginationKey]: newPage,
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {data.slice(offset, offset + limit).map((item) => (
          <MyprojectCard
            key={item.id}
            link={`${link}/${item.id}`}
            projectStatus={item.projectStatus}
            projectTitle={item.projectTitle}
          />
        ))}
      </div>

      <Pagination
        page={currentPage}
        setPage={handlePageChange}
        limit={limit}
        total={data.length}
      />
    </div>
  )
}

export default ProjectList
