import styles from './basicProfile.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import UserProfileBadge from '@/components/common/userProfileBadge/UserProfileBadge'
import Button from '@/components/common/button/Button'
import DialogModal from '@/components/common/modal/DialogModal'
import useModal from '@/hooks/useModal'
import ProfileEditModal from './ProfileEditModal'
import { useEffect, useState } from 'react'
import { MyProfileDataType } from '@/types/mypage/myprofile'
import { fetchData } from '@/utils/fetchData'
import { axiosAccess } from '@/pages/apis'
import Custom404 from '@/pages/404'

const BasicProfile = () => {
  const { openModal, handleOpenModal, handleCloseModal } = useModal()
  const [basicProfile, setBasicProfile] = useState<MyProfileDataType>()

  useEffect(() => {
    fetchData(axiosAccess, '/users/my-profile', setBasicProfile)
  }, [])

  if (!basicProfile) {
    return <Custom404 />
  }

  return (
    <>
      {openModal && (
        <DialogModal
          title="내 프로필 편집"
          modalContent={
            <ProfileEditModal
              nickname={basicProfile.nickname}
              defaultImg={basicProfile.profileImage}
              region={basicProfile.region}
              isLocalLogin={basicProfile.isLocalLogin}
              intro={basicProfile.intro ? basicProfile.intro : ''}
              onClick={handleCloseModal}
            />
          }
          closeModal={handleCloseModal}
        />
      )}
      <div className={styles.basicProfile}>
        <div className={styles.imgArea}>
          <UserProfileImg
            userProfile={basicProfile.profileImage}
            width={140}
            height={140}
          />
        </div>
        <div className={styles.userInfoArea}>
          <p className={styles.nickname}>{basicProfile.nickname}</p>
          <p className={styles.email}>{basicProfile.email}</p>
          <p className={styles.intro}>
            {basicProfile.intro
              ? basicProfile.intro
              : '자기소개를 등록해주세요.'}
          </p>
          <div className={styles.badgeArea}>
            <UserProfileBadge
              title="오프라인"
              state={`${basicProfile.region ? basicProfile.region : '미등록'}`}
            />
            <UserProfileBadge title="벌집레벨" state="LV. 0" yellow />
            <UserProfileBadge title="퇴출전적" state="0회" red />
          </div>
        </div>
        <Button onClick={handleOpenModal}>프로필편집</Button>
      </div>
    </>
  )
}

export default BasicProfile
