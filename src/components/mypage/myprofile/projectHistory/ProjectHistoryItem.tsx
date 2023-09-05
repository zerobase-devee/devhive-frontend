import styles from './projectHistoryItem.module.css'
import { ProjectHistoryDataType } from '@/types/projectHistoryType'

const ProjectHistoryItem = ({
  projectTitle,
  score,
  exclusionStatus,
}: ProjectHistoryDataType) => {
  return (
    <div className={styles.projectItem}>
      <span>{projectTitle}</span>
      <span>・</span>
      <span>팀원평균점수 </span>
      <span className={styles.score}> {score} </span>
      <span>/ 25점</span>
      {exclusionStatus && (
        <>
          <span>・</span>
          <span className={styles.exclusionStatus}>퇴출</span>
        </>
      )}
    </div>
  )
}

export default ProjectHistoryItem
