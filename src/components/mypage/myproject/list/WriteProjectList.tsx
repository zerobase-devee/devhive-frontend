import { myprojectWData } from 'public/data/myprojectData'
import ProjectList from './ProjectList'

const WriteProjectList = () => {
  return (
    <ProjectList paginationKey="writeKey" data={myprojectWData} link="write" />
  )
}

export default WriteProjectList
