import styles from './basicProfile.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import UserProfileBadge from '@/components/common/userProfileBadge/UserProfileBadge'
import Button from '@/components/common/button/Button'
import DialogModal from '@/components/common/modal/DialogModal'
import useModal from '@/hooks/useModal'
import ProfileEditModal from './ProfileEditModal'
import { useEffect, useState } from 'react'
import { MyProfileDataType } from '@/types/users/myprofileDataType'
import { fetchData } from '@/utils/fetchData'
import { fetchAccessData } from '@/utils/fetchAccessData'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import Loading from '@/components/common/loading/Loading'
import { useRecoilValue } from 'recoil'
import { loginState } from '@/recoil/loginState'
import useResponsiveSize from '@/hooks/useResponsiveSize'

const BasicProfile = () => {
  const { isTablet } = useResponsiveSize()
  const { openModal, handleOpenModal, handleCloseModal } = useModal()
  const [hiveLevel, setHiveLevel] = useState<string>('')
  const [exitNum, setExitNum] = useState<string>('')

  const isLogin = useRecoilValue(loginState)

  const { data, error, isLoading } = useQuery<MyProfileDataType>(
    REACT_QUERY_KEY.loginUserProfile,
    () => fetchAccessData('/users/my-profile'),
    {
      enabled: isLogin,
    },
  )

  useEffect(() => {
    if (!data) {
      return
    } else {
      fetchData(`/members/users/${data.userId}/hive-level`, setHiveLevel)
      fetchData(`/users/${data.userId}/exit-num`, setExitNum)
      return
    }
  }, [data])

  if (!data) {
    return null
  }

  if (error) {
    return <div className={styles.basicProfile}>새로고침 해주세요.</div>
  }

  if (isLoading) {
    return <Loading />
  }

  const imageSize = !isTablet ? 140 : 80

  return (
    <>
      {openModal && (
        <DialogModal
          title="내 프로필 편집"
          modalContent={
            <ProfileEditModal
              nickname={data.nickName}
              defaultImg={data.profileImage}
              region={data.region}
              isLocalLogin={data.localLogin}
              intro={data.intro ? data.intro : ''}
              onClick={handleCloseModal}
            />
          }
          closeModal={handleCloseModal}
        />
      )}
      <div className={styles.basicProfile}>
        <div className={styles.imgArea}>
          <UserProfileImg
            userProfile={data.profileImage}
            width={imageSize}
            height={imageSize}
          />
        </div>
        <div className={styles.userInfoArea}>
          <p className={styles.nickname}>{data.nickName}</p>
          <p className={styles.email}>{data.email}</p>
          <p className={styles.intro}>
            {data.intro ? data.intro : '자기소개를 등록해주세요.'}
          </p>
          <div className={styles.badgeArea}>
            <UserProfileBadge
              title="오프라인"
              state={`${data.region ? data.region : '미등록'}`}
            />
            <UserProfileBadge
              title="벌집레벨"
              state={`Lv. ${hiveLevel}`}
              yellow
            />
            <UserProfileBadge title="퇴출전적" state={`${exitNum}회`} red />
          </div>
        </div>
        <Button onClick={handleOpenModal}>프로필편집</Button>
      </div>
    </>
  )
}

export default BasicProfile
