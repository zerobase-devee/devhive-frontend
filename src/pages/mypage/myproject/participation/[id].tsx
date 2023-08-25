import styles from '@/styles/pages/myprojectDetail.module.css'
import { useRouter } from 'next/router'
import { myprojectDetailData } from 'public/data/myprojectDetailData'
import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import Custom404 from '@/pages/404'
import LinkButton from '@/components/common/button/LinkButton'
import ProjectInfo from '@/components/mypage/myprojectDetail/info/ProjectInfo'
import TeamInfo from '@/components/mypage/myprojectDetail/info/TeamInfo'

const ParticipationProject = () => {
  const router = useRouter()
  const id = Number(router.query.id)
  const project = myprojectDetailData.find(
    (item) => item.projectId === id && item.leader === true,
  )

  if (!project) {
    return <Custom404 />
  }

  return (
    <MypageLayout>
      <Title title="내 프로젝트" />
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
          <TeamInfo teamData={project.projectMembers} />
        </div>
        <div className={styles.infoArea}>
          <p className={styles.infoTitle}>평가 정보</p>
        </div>
        <LinkButton fill href={'/mypage/myproject'}>
          목록으로
        </LinkButton>
      </div>
    </MypageLayout>
  )
}

export default ParticipationProject
