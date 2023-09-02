import styles from './profileContent.module.css'
import Custom404 from '@/pages/404'
import { UserProfileDataType } from '@/types/userProfileDataType'
import { fetchData } from '@/utils/fetchData'
import { useEffect, useState } from 'react'
import UserProfileImg from '../common/userProfileImg/UserProfileImg'
import UserProfileBadge from '../common/userProfileBadge/UserProfileBadge'
import BookmarkButton from '../common/bookmarkButton/bookmarkButton'
import CareerList from '../mypage/myprofile/Career/CareerList'
import ProjectHistoryItem from '../mypage/myprofile/projectHistory/ProjectHistoryItem'
import AchievementList from '../mypage/myprofile/achievementList/AchievementList'
import TechStackList from '../mypage/myprofile/techStack/TechStackList'

const ProfileContent = ({ userId }: { userId: number }) => {
  const [userProfileData, setUserProfileData] =
    useState<UserProfileDataType | null>(null)

  useEffect(() => {
    fetchData(`/users/${userId}`, setUserProfileData)
  }, [])

  if (!userProfileData) {
    return <Custom404 />
  }

  const achievement = () => {
    let achievementList = []
    for (let i = 0; i < userProfileData.badge.length; i++) {
      achievementList.push(userProfileData.badge[i])
    }

    return achievementList
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topContent}>
          <div className={styles.profileImgBookmark}>
            <UserProfileImg
              userProfile={userProfileData.profileImage}
              width={100}
              height={100}
            />
            <BookmarkButton active={userProfileData.isFavorite} />
          </div>
          <h2 className={styles.nickname}>{userProfileData.nickname}</h2>
          <div className={styles.badgeArea}>
            <UserProfileBadge
              yellow
              title="벌집레벨"
              state={`LV.${userProfileData.projects.length}`}
            />
            <UserProfileBadge
              red
              title="퇴출전적"
              state={`${userProfileData.exitNum}회`}
            />
          </div>
          <p className={styles.intro}>{userProfileData.intro}</p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomItem}>
          <p className={styles.title}>경력</p>
          <CareerList view careerDataList={userProfileData.careers} />
        </div>
        <div className={styles.bottomItem}>
          <p className={styles.title}>기술스택</p>
          <TechStackList view techStackData={userProfileData.techStacks} />
        </div>
        <div className={styles.bottomItem}>
          <p className={styles.title}>프로젝트 참여 이력</p>
          <div className={styles.projectList}>
            {userProfileData.projects.map((item) => (
              <ProjectHistoryItem
                projectTitle={item.projectName}
                score={item.point}
                exclusionStatus={false}
              />
            ))}
          </div>
        </div>
        <div className={styles.bottomItem}>
          <p className={styles.title}>업적</p>
          <div className={styles.achievArea}>
            <AchievementList
              manner={achievement().includes('매너왕')}
              talentDonation={achievement().includes('재능기부왕')}
              deadline={achievement().includes('마감왕')}
              communication={achievement().includes('소통왕')}
              doctor={achievement().includes('척척박사')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileContent
