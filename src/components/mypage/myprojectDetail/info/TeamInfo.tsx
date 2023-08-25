import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import styles from './detailInfo.module.css'
import { ProjectMemberDataType } from '@/types/mypageDataType'
import Button from '@/components/common/button/Button'

interface TeamInfoProps {
  teamData: ProjectMemberDataType[]
}

const TeamInfo = ({ teamData }: TeamInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {teamData.map((item, index) => (
          <div className={styles.item} key={item.userId}>
            <p className={styles.title}>{index === 0 ? '팀장' : '팀원'}</p>
            <div className={styles.userArea}>
              <div className={styles.profile}>
                <UserProfileImg
                  userProfile={item.profileImage}
                  width={32}
                  height={32}
                />
              </div>
              <p className={styles.nickname}>{item.nickname}</p>
            </div>
          </div>
        ))}
      </div>
      <Button>팀원추가</Button>
    </div>
  )
}

export default TeamInfo
