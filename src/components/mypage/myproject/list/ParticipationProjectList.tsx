import { myprojectPData } from 'public/data/myprojectData'
import ProjectListContainer from './ProjectListContainer'
import MyprojectCard from '../card/MyprojectCard'
import usePagination from '@/hooks/usePagination'

const ParticipationProjectList = () => {
  const limit = 3
  const { page, handlePageChange, offset } = usePagination(
    'myproject-participation',
    limit,
  )

  return (
    <ProjectListContainer
      total={myprojectPData.length}
      page={page}
      limit={limit}
      handlePageChange={handlePageChange}
    >
      <>
        {myprojectPData.slice(offset, offset + limit).map((item) => (
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

export default ParticipationProjectList
