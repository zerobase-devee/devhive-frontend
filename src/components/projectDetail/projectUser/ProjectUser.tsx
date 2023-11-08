import Link from 'next/link'
import styles from './projectUser.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import useModal from '@/hooks/useModal'
import Button from '@/components/common/button/Button'
import InfoModal from '@/components/common/modal/InfoModal'
import { useRecoilValue } from 'recoil'
import { loginState } from '@/recoil/loginState'
import {
  ProjectDetailDataType,
  UserInfo,
} from '@/types/project/projectDataType'
import { useRouter } from 'next/router'
import useProjectDetail from '@/hooks/queries/useProjectDetail'
import useResponsiveSize from '@/hooks/useResponsiveSize'

interface ProjectUserProps {
  readonly writerInfo: UserInfo
  readonly projectMembers: UserInfo[]
  readonly applyStatus: 'PENDING' | 'ACCEPT' | 'REJECT' | null
  readonly loginUser: UserInfo | null
  readonly status: ProjectDetailDataType['status']
}

const ProjectUser = ({
  writerInfo,
  projectMembers,
  applyStatus,
  loginUser,
  status,
}: ProjectUserProps) => {
  const { isTablet } = useResponsiveSize()
  const imageSize = !isTablet ? 100 : 32
  const { openModals, handleOpenModals, handleCloseModals } = useModal()
  const isLogin = useRecoilValue(loginState)
  const router = useRouter()
  const { applyProject, cancelApplyProject } = useProjectDetail()

  const handleApply = async () => {
    try {
      const projectId = Number(router.query.id)
      handleOpenModals('신청')
      await applyProject.mutateAsync(projectId)
    } catch (error) {
      console.error('에러발생: ', error)
    }
  }

  const handleCancelApply = async () => {
    try {
      const projectId = Number(router.query.id)
      handleOpenModals('거절')
      await cancelApplyProject.mutateAsync(projectId)
    } catch (error) {
      console.error('에러발생: ', error)
    }
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
            href={`/profile/${writerInfo.userId}`}
          >
            <UserProfileImg
              userProfile={writerInfo.profileImage}
              width={imageSize}
              height={imageSize}
            />
            <p>
              {writerInfo.nickName}
              {isTablet && <span>작성자</span>}
            </p>
          </Link>
          {status === 'COMPLETE' || status === 'RECRUITMENT_COMPLETE' ? (
            <Button type="button" disabled>
              모집이 완료되었어요
            </Button>
          ) : applyStatus === 'PENDING' ? (
            <Button type="button" onClick={handleCancelApply}>
              참여신청 취소하기
            </Button>
          ) : loginUser && loginUser.userId === writerInfo.userId ? (
            <Button disabled={true} type="button" fill>
              본인글은 신청할 수 없어요
            </Button>
          ) : (
            <Button
              disabled={applyStatus === 'ACCEPT'}
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
                  <span>{item.nickName}</span>
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
