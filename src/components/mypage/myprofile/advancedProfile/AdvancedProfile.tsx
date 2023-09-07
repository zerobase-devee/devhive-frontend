import { useState } from 'react'
import AchievementList from '../achievementList/AchievementList'
import ProjectHistory from '../projectHistory/ProjectHistory'
import TechStackForm from '../techStack/TechStackForm'
import styles from './advancedProfile.module.css'
import Button from '@/components/common/button/Button'
import CareerForm from '../Career/CareerForm'
import CareerList from '../Career/CareerList'
import TechStackList from '../techStack/TechStackList'

const AdvancedProfile = () => {
  const [isOpenCareer, setIsOpenCareer] = useState(false)
  const [isOpenTechStack, setIsOpenTechStack] = useState(false)

  const handleCareer = () => {
    setIsOpenCareer(!isOpenCareer)
  }

  const handleTechStack = () => {
    setIsOpenTechStack(!isOpenTechStack)
  }

  return (
    <div className={styles.advancedProfile}>
      {/* 경력 */}
      <div className={styles.advancedProfileItem}>
        <div className={styles.textArea}>
          <p className={styles.title}>경력</p>
          <p className={styles.desc}>경력을 추가해주세요.</p>
        </div>
        {!isOpenCareer && <Button onClick={handleCareer}>추가하기</Button>}
      </div>
      {isOpenCareer && <CareerForm onClose={handleCareer} />}
      {!isOpenCareer && <CareerList />}
      {/* 기술스택 */}
      <div className={styles.advancedProfileItem}>
        <div className={styles.textArea}>
          <p className={styles.title}>기술스택</p>
          <p className={styles.desc}>사용하는 기술스택을 추가해주세요.</p>
        </div>
        {!isOpenTechStack && (
          <Button type="button" onClick={handleTechStack}>
            추가하기
          </Button>
        )}
      </div>
      {isOpenTechStack && <TechStackForm onClose={handleTechStack} />}
      {!isOpenTechStack && <TechStackList />}
      {/* 프로젝트 참여 이력 */}
      <ProjectHistory />
      {/* 업적 */}
      <div className={styles.advancedProfileItem}>
        <div className={styles.textArea}>
          <p className={styles.title}>업적</p>
          <p className={styles.desc}>
            프로젝트에 참여해서 업적을 달성해보세요!
          </p>
        </div>
        <AchievementList />
      </div>
    </div>
  )
}

export default AdvancedProfile
