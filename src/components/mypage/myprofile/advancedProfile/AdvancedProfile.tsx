import { useState } from 'react'
import AchievementList from '../achievementList/AchievementList'
import ProjectHistory from '../projectHistory/ProjectHistory'
import TechStack from '../techStack/TechStack'
import styles from './advancedProfile.module.css'
import Button from '@/components/common/button/Button'
import CareerForm from '../Career/CareerForm'
import CareerList from '../Career/CareerList'
import { CareerData } from '@/types/mypageDataType'

const AdvancedProfile = () => {
  const [isOpenCareer, setIsOpenCareer] = useState(false)
  const [isUpdateCareer, setIsUpdateCareer] = useState(false)
  const [isOpenTechStack, setIsOpenTechStack] = useState(false)

  const handleCareer = () => {
    setIsOpenCareer(!isOpenCareer)
  }

  const updateCareer = () => {
    setIsUpdateCareer(!isUpdateCareer)
  }

  const handleTechStack = () => {
    setIsOpenTechStack(!isOpenTechStack)
  }

  const careerDataList: CareerData[] = [
    {
      company: '회사A',
      position: '직위A',
      startDate: '2023-05-08',
      endDate: '2023-05-09',
    },
    {
      company: '회사B',
      position: '직위B',
      startDate: '2023-05-09',
      endDate: '',
    },
  ]

  return (
    <div className={styles.advancedProfile}>
      <div className={styles.advancedProfileItem}>
        <div className={styles.textArea}>
          <p className={styles.title}>경력</p>
          <p className={styles.desc}>경력을 추가해주세요.</p>
        </div>
        {!isOpenCareer && !isUpdateCareer && (
          <Button onClick={handleCareer}>추가하기</Button>
        )}
      </div>
      {isOpenCareer && <CareerForm onClose={handleCareer} />}
      {isUpdateCareer && (
        <CareerForm
          modify
          onClose={updateCareer}
          companyData="회사A"
          positionData="직위A"
          startDateData="2023-05-08"
          endDateData="2023-05-09"
        />
      )}
      {!isOpenCareer && !isUpdateCareer && (
        <CareerList onClick={updateCareer} careerDataList={careerDataList} />
      )}
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
      {isOpenTechStack && <TechStack onClose={handleTechStack} />}
      <ProjectHistory />
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
