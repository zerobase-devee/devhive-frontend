import usePagination from '@/hooks/usePagination'
import { myprojectWData } from 'public/data/myprojectData'
import ProjectListContainer from './ProjectListContainer'
import MyprojectCard from '../card/MyprojectCard'

const WriteProjectList = () => {
  const limit = 3
  const { page, handlePageChange, offset } = usePagination(
    'myproject-write',
    limit,
  )

  return (
    <ProjectListContainer
      total={myprojectWData.length}
      page={page}
      limit={limit}
      handlePageChange={handlePageChange}
    >
      <>
        {myprojectWData.slice(offset, offset + limit).map((item) => (
          <MyprojectCard
            key={item.id}
            link={`participation/${item.id}`}
            projectStatus={item.projectStatus}
            projectTitle={item.projectTitle}
          />
        ))}
      </>
    </ProjectListContainer>
  )
}

export default WriteProjectList
