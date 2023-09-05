import ProjectCard from '@/components/project/card/ProjectCard'
import styles from './list.module.css'
import { projectCardData } from 'public/data/projectCardData'
import LinkButton from '@/components/common/button/LinkButton'

const MainProjectList = () => {
  const LIMIT_CARD_NUM = 6

  return projectCardData.length === 0 ? (
    <div className={styles.null}>아직 프로젝트가 없어요.</div>
  ) : (
    <>
      <div className={styles.list}>
        {projectCardData.slice(0, LIMIT_CARD_NUM).map((item) => (
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
      <LinkButton href="/project">프로젝트 더보기</LinkButton>
    </>
  )
}

export default MainProjectList
