import styles from './profileContent.module.css'
import Custom404 from '@/pages/404'
import { fetchData } from '@/utils/fetchData'
import { useEffect, useState } from 'react'
import UserProfileImg from '../common/userProfileImg/UserProfileImg'
import UserProfileBadge from '../common/userProfileBadge/UserProfileBadge'
import BookmarkButton from '../common/bookmarkButton/bookmarkButton'
import CareerList from '../mypage/myprofile/Career/CareerList'
import ProjectHistoryItem from '../mypage/myprofile/projectHistory/ProjectHistoryItem'
import AchievementList from '../mypage/myprofile/achievementList/AchievementList'
import TechStackList from '../mypage/myprofile/techStack/TechStackList'
import { ProfileDataType } from '@/types/users/profileDataType'
import { ProjectHistoryDataType } from '@/types/users/projectHistoryDataType'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import Loading from '../common/loading/Loading'
import { loginState } from '@/recoil/loginState'
import { fetchAccessData } from '@/utils/fetchAccessData'

const ProfileContent = ({ userId }: { userId: number }) => {
  const isLogin = useRecoilValue(loginState)
  const userInfo = useRecoilValue(loginUserInfo)
  const loginUserId = userInfo.userId
  const { data, error, isLoading } = useQuery<ProfileDataType>(
    REACT_QUERY_KEY.profile,
    isLogin
      ? () => fetchAccessData(`/users/${userId}`)
      : () => fetchData(`/users/${userId}`),
  )
  const [hiveLevel, setHiveLevel] = useState<string>('')
  const [exitNum, setExitNum] = useState<string>('')
  const [projectData, setProjectData] = useState<ProjectHistoryDataType[]>([])

  useEffect(() => {
    fetchData(`/members/users/${userId}/hive-level`, setHiveLevel)
    fetchData(`/users/${userId}/exit-num`, setExitNum)
    fetchData(`/members/users/${userId}/project-histories`, setProjectData)
  }, [userId])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Custom404 />
  }

  if (error) {
    return <Custom404 />
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topContent}>
          <div className={styles.profileImgBookmark}>
            <UserProfileImg
              userProfile={data.profileImage}
              width={100}
              height={100}
            />
            {loginUserId === userId ? null : (
              <BookmarkButton
                userId={userId}
                favoriteId={data.favoriteId}
                active={data.favoriteId ? true : false}
              />
            )}
          </div>
          <h2 className={styles.nickname}>{data.nickName}</h2>
          <div className={styles.badgeArea}>
            <UserProfileBadge
              yellow
              title="벌집레벨"
              state={`LV.${hiveLevel}`}
            />
            <UserProfileBadge red title="퇴출전적" state={`${exitNum}회`} />
          </div>
          <p className={styles.intro}>{data.intro}</p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomItem}>
          <p className={styles.title}>경력</p>
          <CareerList viewUserId={userId} view />
        </div>
        <div className={styles.bottomItem}>
          <p className={styles.title}>기술스택</p>
          <TechStackList viewUserId={userId} view />
        </div>
        <div className={styles.bottomItem}>
          <p className={styles.title}>프로젝트 참여 이력</p>
          <div className={styles.projectList}>
            {projectData.length === 0 ? (
              <div className={styles.null}>아직 참여한 프로젝트가 없어요.</div>
            ) : (
              projectData.map((item) => (
                <ProjectHistoryItem
                  key={item.projectName}
                  projectName={item.projectName}
                  totalAverageScore={item.totalAverageScore}
                />
              ))
            )}
          </div>
        </div>
        <div className={styles.bottomItem}>
          <p className={styles.title}>업적</p>
          <div className={styles.achievArea}>
            <AchievementList viewUserId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileContent
