import ProjectCard from '@/components/project/card/ProjectCard'
import styles from './list.module.css'
import { ProjectDataType } from '@/types/projectDataType'
import { projectCardData } from 'public/data/projectCardData'

const MainProjectList = () => {
  return (
    <div className={styles.list}>
      {projectCardData.slice(0, 6).map((item) => (
        <ProjectCard
          key={item.projectID}
          projectID={item.projectID}
          projectTitle={item.projectTitle}
          nickname={item.nickname}
          userProfile={item.userProfile}
          createdDate={item.createdDate}
          viewCount={item.viewCount}
          techStacks={item.techStacks}
          developmentType={item.developmentType}
          recruitmentType={item.recruitmentType}
          region={item.region}
          bookmark={item.bookmark}
          participatingUsers={item.participatingUsers}
        />
      ))}
    </div>
  )
}

export default MainProjectList
