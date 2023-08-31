import Link from 'next/link'
import styles from './projectUser.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import { User } from '@/types/projectDataType'
import useModal from '@/hooks/useModal'
import Button from '@/components/common/button/Button'
import InfoModal from '@/components/common/modal/InfoModal'
import { useRecoilValue } from 'recoil'
import { isLoginState } from '@/recoil/authToken'
import { useRouter } from 'next/navigation'

interface ProjectUserProps {
  writeUser: User
  projectMembers: User[]
  applyStatus: null | string
}

const ProjectUser = ({
  writeUser,
  projectMembers,
  applyStatus,
}: ProjectUserProps) => {
  const { openModals, handleOpenModals, handleCloseModals } = useModal()
  const isLogin = useRecoilValue(isLoginState)
  const router = useRouter()

  const handleApply = () => {
    handleOpenModals('신청')
    // 참여 신청 로직 추가 예정
  }

  const handleCancelApply = () => {
    handleOpenModals('거절')
    // 참여 거절 로직 추가 예정
  }

  return (
    <>
      {openModals['신청'] &&
        (!isLogin ? (
          <InfoModal
            buttonText="로그인"
            onClick={() => {
              router.push('/?user=login')
            }}
          >
            로그인이 필요한 서비스입니다. <br />
            로그인해주세요.
          </InfoModal>
        ) : (
          <InfoModal
            buttonText="확인"
            onClick={() => {
              handleCloseModals('신청')
            }}
          >
            프로젝트 참여신청이 완료되었어요! <br />
            승인 여부를 알림으로 알려드릴게요.
          </InfoModal>
        ))}
      {openModals['거절'] && (
        <InfoModal
          buttonText="확인"
          onClick={() => {
            handleCloseModals('거절')
          }}
        >
          프로젝트 참여신청을 취소했어요. <br />
          다음에 다시 신청해주세요.
        </InfoModal>
      )}
      <div className={styles.projectUserArea}>
        <div className={styles.writerArea}>
          <Link
            className={styles.userProfile}
            href={`/profile/${writeUser.userId}`}
          >
            <UserProfileImg
              userProfile={writeUser.profileImage}
              width={100}
              height={100}
            />
            <p>{writeUser.nickname}</p>
          </Link>
          {applyStatus === 'pending' ? (
            <Button type="button" onClick={handleCancelApply}>
              참여신청 취소하기
            </Button>
          ) : (
            <Button
              disabled={applyStatus === 'accept'}
              type="button"
              fill
              onClick={handleApply}
            >
              프로젝트 참여신청
            </Button>
          )}
        </div>
        <div className={styles.projectMemberArea}>
          <p>프로젝트 참여자</p>
          <ul className={styles.projectMemberList}>
            {projectMembers.map((item) => (
              <li key={item.userId}>
                <Link
                  className={styles.projectMember}
                  href={`/profile/${item.userId}`}
                >
                  <UserProfileImg
                    userProfile={item.profileImage}
                    width={24}
                    height={24}
                  />
                  <span>{item.nickname}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ProjectUser
