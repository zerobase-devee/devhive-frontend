import { myprojectPData } from 'public/data/myprojectData'
import ProjectList from './ProjectList'

const ParticipationProjectList = () => {
  return (
    <ProjectList
      paginationKey="participationKey"
      data={myprojectPData}
      link="participation"
    />
  )
}

export default ParticipationProjectList
