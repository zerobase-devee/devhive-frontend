import styles from './projectHistory.module.css'
import ProjectHistoryItem from './ProjectHistoryItem'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/fetchData'
import { ProjectHistoryDataType } from '@/types/users/projectHistoryDataType'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'

const ProjectHistory = () => {
  const [projectHistoryData, setProjectHistoryData] = useState<
    ProjectHistoryDataType[]
  >([])
  const userInfo = useRecoilValue(loginUserInfo)
  const userId = userInfo.userId

  useEffect(() => {
    if (!userId) {
      return
    } else {
      fetchData(
        `/members/users/${userId}/project-histories`,
        setProjectHistoryData,
      )
      return
    }
  }, [userId])

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
                  projectName={item.projectName}
                  totalAverageScore={item.totalAverageScore}
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
