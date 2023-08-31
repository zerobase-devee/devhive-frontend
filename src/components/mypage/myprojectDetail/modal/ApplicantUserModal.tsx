import styles from './applicantUserModal.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import Button from '@/components/common/button/Button'
import { applicantUserData } from 'public/data/applicantUserData'
import { ApplicantUserDataType } from '@/types/mypageDataType'
import { useState } from 'react'
import { FiUserX } from 'react-icons/fi'

const ApplicantUserModal = () => {
  const [hiddenItems, setHiddenItems] = useState<number[]>([])
  const handleApprove = (user: ApplicantUserDataType) => {
    console.log(`승인 요청 보내기: ${user}`)
    setHiddenItems((prevHiddenItems) => [...prevHiddenItems, user.userId])
  }

  const handleReject = (user: ApplicantUserDataType) => {
    console.log(`거절 요청 보내기: ${user}`)
    setHiddenItems((prevHiddenItems) => [...prevHiddenItems, user.userId])
  }

  return (
    <div className={styles.list}>
      {applicantUserData.length === 0 ||
      hiddenItems.length === applicantUserData.length ? (
        <div className={styles.null}>
          <FiUserX />
          아직 신청한 사람이 없어요.
        </div>
      ) : (
        applicantUserData.map(
          (item) =>
            !hiddenItems.includes(item.userId) && (
              <div className={styles.item} key={item.userId}>
                <div className={styles.userArea}>
                  <div className={styles.userImg}>
                    <UserProfileImg
                      userProfile={item.profileImage}
                      width={32}
                      height={32}
                    />
                  </div>
                  <p className={styles.nickname}>{item.nickname}</p>
                </div>
                <LinkButton gray href={`/profile/@${item.nickname}`}>
                  프로필
                </LinkButton>
                <Button onClick={() => handleApprove(item)} fill type="button">
                  승인
                </Button>
                <Button onClick={() => handleReject(item)} type="button">
                  거절
                </Button>
              </div>
            ),
        )
      )}
    </div>
  )
}

export default ApplicantUserModal
