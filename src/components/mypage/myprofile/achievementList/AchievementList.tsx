import styles from './achievementList.module.css'
import Image from 'next/image'
import deactivationAchievement1 from 'public/images/achievement/deactivationAchievement1.png'
import deactivationAchievement2 from 'public/images/achievement/deactivationAchievement2.png'
import deactivationAchievement3 from 'public/images/achievement/deactivationAchievement3.png'
import deactivationAchievement4 from 'public/images/achievement/deactivationAchievement4.png'
import deactivationAchievement5 from 'public/images/achievement/deactivationAchievement5.png'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { fetchData } from '@/utils/fetchData'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import Loading from '@/components/common/loading/Loading'
import { BadgeDataType } from '@/types/users/badgeDataType'

const AchievementList = () => {
  const userInfo = useRecoilValue(loginUserInfo)
  const userId = userInfo.userId

  const { data, error, isLoading } = useQuery<BadgeDataType[]>(
    REACT_QUERY_KEY.loginUserBadge,
    () => fetchData(`/users/${userId}/badges`),
  )

  const achievements = [
    { src: deactivationAchievement1, text: '매너왕' },
    { src: deactivationAchievement2, text: '재능기부왕' },
    { src: deactivationAchievement3, text: '마감왕' },
    { src: deactivationAchievement4, text: '소통왕' },
    { src: deactivationAchievement5, text: '척척박사' },
  ]

  if (!data || data.length === 0) {
    return (
      <div className={styles.achievementList}>
        {achievements.map((achievement, index) => (
          <div key={index} className={styles.achievementItem}>
            <Image
              src={achievement.src}
              width={48}
              height={48}
              alt={achievement.text}
            />
            <p className={styles.default}>{achievement.text}</p>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <p>에러 발생</p>
  }

  if (isLoading) {
    return <Loading />
  }

  const MAX_EXP = 50

  const experiencePoint = (score: number) => {
    if (score % 50 === 0) {
      return 0
    } else if (score < 50) {
      return score
    } else if (score > 50) {
      return score % 50
    } else {
      return score - MAX_EXP
    }
  }

  const level = (score: number) => {
    return Math.floor(score / 50)
  }

  return (
    <div className={styles.achievementList}>
      {data.map((item: BadgeDataType) => (
        <div key={item.badgeDto.id} className={styles.achievementItem}>
          <Image
            src={item.badgeDto.image}
            width={48}
            height={48}
            alt={item.badgeDto.name}
          />
          <p className={styles.active}>
            {item.badgeDto.name} Lv.{level(item.score)}
          </p>
          <div className={styles.levelInfo}>
            <p>경험치</p>
            <p className={styles.levelScore}>
              {experiencePoint(item.score)}/{MAX_EXP}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AchievementList
