import { ProjectHistoryDataType } from '@/types/projectHistoryType'
import styles from './projectHistory.module.css'
import ProjectHistoryItem from './ProjectHistoryItem'
import { projectHistoryData } from 'public/data/projectHistoryData'

const ProjectHistory = () => {
  return (
    <div className={styles.container}>
      <div className={projectHistoryData.length !== 0 ? styles.titleArea : ''}>
        <p className={styles.title}>프로젝트 참여 이력</p>
      </div>
      {projectHistoryData.length !== 0 ? (
        <>
          <div className={styles.line} />
          <div className={styles.projectList}>
            {projectHistoryData.map(
              (item: ProjectHistoryDataType, index: number) => (
                <ProjectHistoryItem
                  key={index}
                  projectTitle={item.projectTitle}
                  score={item.score}
                  exclusionStatus={item.exclusionStatus}
                />
              ),
            )}
          </div>
        </>
      ) : (
        <p className={styles.desc}>아직 프로젝트에 참여하지 않았어요.</p>
      )}
    </div>
  )
}

export default ProjectHistory
