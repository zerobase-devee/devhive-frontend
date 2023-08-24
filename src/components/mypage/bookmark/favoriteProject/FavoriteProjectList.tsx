import styles from './favoriteProjectCard.module.css'
import FavoriteProjectCard from './FavoriteProjectCard'
import { FavoriteProjectListProps } from '@/types/mypageDataType'
import FavoriteNull from '../favoriteNull/FavoriteNull'

const FavoriteProjectList = () => {
  const favoriteProjects: FavoriteProjectListProps[] = []

  return (
    <>
      {favoriteProjects.length === 0 ? (
        <FavoriteNull>북마크에 추가한 프로젝트가 아직 없어요.</FavoriteNull>
      ) : (
        <div className={styles.cardListContaienr}>
          {favoriteProjects.map((project) => (
            <FavoriteProjectCard
              key={project.projectId}
              projectTitle={project.projectTitle}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default FavoriteProjectList
