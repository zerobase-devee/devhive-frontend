'use client'

import styles from './basicProfile.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import UserProfileBadge from '@/components/common/userProfileBadge/UserProfileBadge'
import Button from '@/components/common/button/Button'
import DialogModal from '@/components/common/modal/DialogModal'
import useModal from '@/hooks/useModal'
import ProfileEditModal from './ProfileEditModal'

const BasicProfile = () => {
  const { openModal, handleOpenModal, handleCloseModal } = useModal()

  const handleModalButton = () => {
    handleCloseModal()
  }

  return (
    <>
      {openModal && (
        <DialogModal
          title="내 프로필 편집"
          modalContnet={<ProfileEditModal onClick={handleCloseModal} />}
          closeModal={handleCloseModal}
        />
      )}
      <div className={styles.basicProfile}>
        <div className={styles.imgArea}>
          <UserProfileImg userProfile={null} width={140} height={140} />
        </div>
        <div className={styles.userInfoArea}>
          <p className={styles.nickname}>닉네임 님</p>
          <p className={styles.email}>leeahreum99@naver.com</p>
          <p className={styles.intro}>
            컴포넌트에 userProfile 프로퍼티의 타입을 추가합니다.
          </p>
          <div className={styles.badgeArea}>
            <UserProfileBadge title="오프라인" state="미등록" />
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
