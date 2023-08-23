import styles from './achievementList.module.css'
import Image from 'next/image'
import deactivationAchievement1 from 'public/images/achievement/deactivationAchievement1.png'
import deactivationAchievement2 from 'public/images/achievement/deactivationAchievement2.png'
import deactivationAchievement3 from 'public/images/achievement/deactivationAchievement3.png'
import deactivationAchievement4 from 'public/images/achievement/deactivationAchievement4.png'
import deactivationAchievement5 from 'public/images/achievement/deactivationAchievement5.png'

const AchievementList = () => {
  return (
    <div className={styles.achievementList}>
      <div className={styles.achievementItem}>
        <Image
          src={deactivationAchievement1}
          width={48}
          height={48}
          alt="매너왕"
        />
        <p>매너왕</p>
      </div>
      <div className={styles.achievementItem}>
        <Image
          src={deactivationAchievement2}
          width={48}
          height={48}
          alt="재능기부왕"
        />
        <p>재능기부왕</p>
      </div>
      <div className={styles.achievementItem}>
        <Image
          src={deactivationAchievement3}
          width={48}
          height={48}
          alt="마감왕"
        />
        <p>마감왕</p>
      </div>
      <div className={styles.achievementItem}>
        <Image
          src={deactivationAchievement4}
          width={48}
          height={48}
          alt="소통왕"
        />
        <p>소통왕</p>
      </div>
      <div className={styles.achievementItem}>
        <Image
          src={deactivationAchievement5}
          width={48}
          height={48}
          alt="척척박사"
        />
        <p>척척박사</p>
      </div>
    </div>
  )
}

export default AchievementList
