import styles from './achievementList.module.css'
import Image from 'next/image'
import deactivationAchievement1 from 'public/images/achievement/deactivationAchievement1.png'
import deactivationAchievement2 from 'public/images/achievement/deactivationAchievement2.png'
import deactivationAchievement3 from 'public/images/achievement/deactivationAchievement3.png'
import deactivationAchievement4 from 'public/images/achievement/deactivationAchievement4.png'
import deactivationAchievement5 from 'public/images/achievement/deactivationAchievement5.png'
import achievement1 from 'public/images/achievement/achievement1.png'
import achievement2 from 'public/images/achievement/achievement2.png'
import achievement3 from 'public/images/achievement/achievement3.png'
import achievement4 from 'public/images/achievement/achievement4.png'
import achievement5 from 'public/images/achievement/achievement5.png'

interface AchievementListProps {
  manner?: boolean
  talentDonation?: boolean
  deadline?: boolean
  communication?: boolean
  doctor?: boolean
}

const AchievementList = ({
  manner,
  talentDonation,
  deadline,
  communication,
  doctor,
}: AchievementListProps) => {
  return (
    <div className={styles.achievementList}>
      <div className={styles.achievementItem}>
        {manner ? (
          <Image src={achievement1} width={48} height={48} alt="매너왕" />
        ) : (
          <Image
            src={deactivationAchievement1}
            width={48}
            height={48}
            alt="매너왕"
          />
        )}
        <p className={`${manner ? styles.active : styles.default}`}>매너왕</p>
      </div>
      <div className={styles.achievementItem}>
        {talentDonation ? (
          <Image src={achievement2} width={48} height={48} alt="재능기부왕" />
        ) : (
          <Image
            src={deactivationAchievement2}
            width={48}
            height={48}
            alt="재능기부왕"
          />
        )}
        <p className={`${talentDonation ? styles.active : styles.default}`}>
          재능기부왕
        </p>
      </div>
      <div className={styles.achievementItem}>
        {deadline ? (
          <Image src={achievement3} width={48} height={48} alt="마감왕" />
        ) : (
          <Image
            src={deactivationAchievement3}
            width={48}
            height={48}
            alt="마감왕"
          />
        )}
        <p className={`${deadline ? styles.active : styles.default}`}>마감왕</p>
      </div>
      <div className={styles.achievementItem}>
        {communication ? (
          <Image src={achievement4} width={48} height={48} alt="소통왕" />
        ) : (
          <Image
            src={deactivationAchievement4}
            width={48}
            height={48}
            alt="소통왕"
          />
        )}
        <p className={`${communication ? styles.active : styles.default}`}>
          소통왕
        </p>
      </div>
      <div className={styles.achievementItem}>
        {doctor ? (
          <Image src={achievement5} width={48} height={48} alt="척척박사" />
        ) : (
          <Image
            src={deactivationAchievement5}
            width={48}
            height={48}
            alt="척척박사"
          />
        )}
        <p className={`${doctor ? styles.active : styles.default}`}>척척박사</p>
      </div>
    </div>
  )
}

export default AchievementList
