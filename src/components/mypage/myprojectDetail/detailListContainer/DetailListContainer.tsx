import styles from './detailListContainer.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import ProjectInfo from '../info/ProjectInfo'
import TeamInfo from '../info/TeamInfo'
import { useRouter } from 'next/router'
import { myprojectDetailData } from 'public/data/myprojectDetailData'
import Custom404 from '@/pages/404'
import EvaluationInfo from '../info/EvaluationInfo'

interface DetailListContainerProps {
  isLeader: boolean
}

const DetailListContainer = ({ isLeader }: DetailListContainerProps) => {
  const router = useRouter()
  const id = Number(router.query.id)
  const project = myprojectDetailData.find(
    (item) => item.projectId === id && item.leader === isLeader,
  )

  if (!project) {
    return <Custom404 />
  }

  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoArea}>
        <p className={styles.infoTitle}>프로젝트 정보</p>
        <ProjectInfo
          projectId={project.projectId}
          projectName={project.projectName}
          deadline={project.deadline}
          projectStatus={project.projectStatus}
          startDate={project.startDate}
          endDate={project.endDate}
          leader={project.leader}
        />
      </div>
      <div className={styles.infoArea}>
        <p className={styles.infoTitle}>팀원 정보</p>
        <TeamInfo
          reviwerId={project.reviewerId}
          status={project.projectStatus}
          writer={project.userId}
          teamData={project.projectMembers}
          projectExitVote={project.projectExitVote}
        />
      </div>
      <div className={styles.infoArea}>
        <p className={styles.infoTitle}>평가 정보</p>
        <EvaluationInfo score={project.totalAverageScore} />
      </div>
      <LinkButton fill href={'/mypage/myproject'}>
        목록으로
      </LinkButton>
    </div>
  )
}

export default DetailListContainer
