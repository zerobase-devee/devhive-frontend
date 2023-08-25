import { myprojectPData } from 'public/data/myprojectData'
import ProjectList from './ProjectList'
import ProjectListNull from './ProjectListNull'

const ParticipationProjectList = () => {
  return myprojectPData.length === 0 ? (
    <ProjectListNull
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
    <ProjectList
      paginationKey="participationKey"
      data={myprojectPData}
      link="participation"
    />
  )
}

export default ParticipationProjectList
