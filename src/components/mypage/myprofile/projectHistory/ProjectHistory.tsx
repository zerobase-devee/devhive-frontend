import { ProjectHistoryDataType } from '@/types/projectHistoryType'
import styles from './projectHistory.module.css'
import ProjectHistoryItem from './ProjectHistoryItem'

const ProjectHistory = () => {
  // const projectHistoryData: ProjectHistoryDataType[] = []

  const projectHistoryData: ProjectHistoryDataType[] = [
    {
      projectTitle: 'Project A',
      score: 25,
      exclusionStatus: false,
    },
    {
      projectTitle: 'Project B',
      score: 0,
      exclusionStatus: true,
    },
    {
      projectTitle: 'Project C',
      score: 5,
      exclusionStatus: false,
    },
  ]

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
