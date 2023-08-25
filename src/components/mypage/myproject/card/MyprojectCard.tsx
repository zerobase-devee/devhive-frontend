import Link from 'next/link'
import styles from './myprojectCard.module.css'
import ProjectBadge from '@/components/common/projectBadge/ProjectBadge'

interface MyprojectCardProps {
  link: string
  projectStatus: string
  projectTitle: string
}

const MyprojectCard = ({
  link,
  projectStatus,
  projectTitle,
}: MyprojectCardProps) => {
  return (
    <Link href={`/mypage/myproject/${link}`} className={styles.card}>
      <p className={styles.desc}>프로젝트진행</p>
      <p className={styles.desc}>프로젝트명</p>
      <ProjectBadge
        red={projectStatus !== '프로젝트시작'}
        green={projectStatus === '프로젝트시작'}
      >
        {projectStatus}
      </ProjectBadge>
      <p className={styles.projectTitle}>{projectTitle}</p>
    </Link>
  )
}

export default MyprojectCard
