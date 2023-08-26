import ListNull from '@/components/common/listNull/ListNull'
import styles from './projectListContainer.module.css'
import Pagination from '@/components/common/pagination/Pagination'

interface ProjectListProps {
  readonly children: React.ReactNode
  readonly total: number
  readonly page: number
  readonly handlePageChange: (newpage: number) => void
  readonly limit: number
}

const ProjectListContainer = ({
  children,
  total,
  page,
  handlePageChange,
  limit,
}: ProjectListProps) => {
  return total === 0 ? (
    <ListNull
      href={'/project'}
      contentText={
        <p>
          아직 참여한 프로젝트가 없어요! <br />
          프로젝트에 참여해보세요.
        </p>
      }
      buttonText="프로젝트 보기"
    />
  ) : (
    <div className={styles.container}>
      <div className={styles.listContainer}>{children}</div>
      <Pagination
        page={page}
        setPage={handlePageChange}
        limit={limit}
        total={total}
      />
    </div>
  )
}

export default ProjectListContainer
