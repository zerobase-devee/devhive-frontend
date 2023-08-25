import { myprojectWData } from 'public/data/myprojectData'
import ProjectList from './ProjectList'
import ProjectListNull from './ProjectListNull'

const WriteProjectList = () => {
  return myprojectWData.length === 0 ? (
    <ProjectListNull
      href={'/project'}
      contentText={
        <p>
          아직 생성한 프로젝트가 없어요! <br />
          프로젝트를 만들어보세요.
        </p>
      }
      buttonText="프로젝트 올리기"
    />
  ) : (
    <ProjectList paginationKey="writeKey" data={myprojectWData} link="write" />
  )
}

export default WriteProjectList
