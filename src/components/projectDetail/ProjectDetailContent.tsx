import Custom404 from '@/pages/404'
import { ProjectDetailDataType } from '@/types/projectDataType'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProjectBadge from '../common/projectBadge/ProjectBadge'

const ProjectDetailContent = ({ projectId }: { projectId: number }) => {
  const [projectData, setProjectData] = useState<ProjectDetailDataType | null>(
    null,
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `/api/projects/${projectId}`,
        })
        if (res.status === 200) {
          setProjectData(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [projectId])

  if (!projectData) {
    return <Custom404 />
  }

  return (
    <div>
      <ProjectBadge
        red={projectData.projectStatus !== '프로젝트완료'}
        green={projectData.projectStatus === '프로젝트완료'}
      >
        {projectData.projectStatus}
      </ProjectBadge>
      <p>{projectData.projectTitle}</p>
    </div>
  )
}

export default ProjectDetailContent
