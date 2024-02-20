import styles from './detailInfo.module.css'
import React, { useEffect, useState } from 'react'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import Button from '@/components/common/button/Button'
import DialogModal from '@/components/common/modal/DialogModal'
import TeamEvaluationModal from '../modal/TeamEvaluationModal'
import useModal from '@/hooks/useModal'
import ApplicantUserModal from '../modal/ApplicantUserModal'
import InfoModal from '@/components/common/modal/InfoModal'
import {
  ProjectMemberDataType,
  ProjectVoteDataType,
} from '@/types/users/myprojectDataType'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import useMyProject from '@/hooks/queries/useMyProject'
import { useRouter } from 'next/navigation'

interface TeamInfoProps {
  writer: number
  projectMember: ProjectMemberDataType[]
  status: string
  voteData: ProjectVoteDataType[]
  projectId: number
}

const TeamInfo = ({
  projectMember,
  writer,
  status,
  voteData,
  projectId,
}: TeamInfoProps) => {
  const router = useRouter()
  const loginUser = useRecoilValue(loginUserInfo)
  const loginUserId = loginUser.userId
  const {
    postProjectExitVote,
    putProjectExitVote,
    exitTeamMember,
    exitTeamLeader,
  } = useMyProject()
  const { openModal, handleOpenModal, handleCloseModal } = useModal()
  const [openEvaluationModals, setOpenEvaluationModals] = useState<{
    [userId: number]: boolean
  }>({})
  const [openExitVoteModals, setOpenExitVoteModals] = useState<{
    [userId: number]: boolean
  }>({})
  const [openSendVoteModals, setOpenSendVoteModals] = useState<{
    [userId: number]: boolean
  }>({})
  const [scrollPosition, setScrollPosition] = useState<number | null>(null)
  const falseCount = voteData.filter((item) => item.voted === false).length
  const finalVotedValue = falseCount === 1 ? true : false

  useEffect(() => {
    if (
      Object.values(openEvaluationModals).some((value) => value === true) ||
      Object.values(openExitVoteModals).some((value) => value === true) ||
      Object.values(openSendVoteModals).some((value) => value === true)
    ) {
      setScrollPosition(window.scrollY)
      document.body.style.overflow = 'hidden'
    } else {
      if (scrollPosition !== null) {
        window.scrollTo(0, scrollPosition)
        setScrollPosition(null)
      }
      document.body.style.overflow = 'auto'
    }
  }, [
    openEvaluationModals,
    openExitVoteModals,
    openSendVoteModals,
    scrollPosition,
  ])

  const handleOpenModals = (
    userId: number,
    setOpenModals: React.Dispatch<
      React.SetStateAction<{ [key: number]: boolean }>
    >,
  ) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [userId]: true,
    }))
  }

  const handleCloseModals = (
    userId: number,
    setOpenModals: React.Dispatch<
      React.SetStateAction<{ [key: number]: boolean }>
    >,
  ) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [userId]: false,
    }))
  }

  const [remainingTime, setRemainingTime] = useState('만료')
  const countDown24Hours = (startTime: string) => {
    const targetTime = new Date(startTime).getTime() + 24 * 60 * 60 * 1000
    const currentTime = new Date().getTime()
    const timeDifference = targetTime - currentTime

    if (timeDifference <= 0) {
      setRemainingTime('만료')
    } else {
      const hours = Math.floor(timeDifference / 3600000)
      const minutes = Math.floor((timeDifference % 3600000) / 60000)
      const seconds = Math.floor((timeDifference % 60000) / 1000)

      const formattedTime = `${String(hours).padStart(2, '0')}시간${String(
        minutes,
      ).padStart(2, '0')}분${String(seconds).padStart(2, '0')}초`
      setRemainingTime(formattedTime)

      if (timeDifference > 1000) {
        setTimeout(() => {
          countDown24Hours(startTime)
        }, 1000)
      }
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (voteData.length === 0) {
        return
      } else {
        countDown24Hours(voteData[0]?.createDate)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteData[0]?.createDate])

  const votedMembers = Array.isArray(voteData)
    ? voteData.filter((member) => member.voted === true)
    : null

  const createVote = async (targetUserId: number) => {
    try {
      await postProjectExitVote.mutateAsync({ projectId, targetUserId })
    } catch (error) {
      console.error(error)
    }
  }

  const sendVote = async (vote: boolean, userId: number) => {
    try {
      const matchingVoteItem = voteData.find(
        (voteItem) => voteItem.userId === loginUserId,
      )
      const voteId = matchingVoteItem ? matchingVoteItem.voteId : null
      if (voteId) {
        await putProjectExitVote.mutateAsync({
          projectId,
          voteId,
          vote,
        })
        handleCloseModals(userId, setOpenExitVoteModals)
        if (!finalVotedValue) {
          handleOpenModals(userId, setOpenSendVoteModals)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.container}>
      {openModal && (
        <DialogModal
          title="신청자 목록"
          modalContent={<ApplicantUserModal />}
          closeModal={handleCloseModal}
        />
      )}
      <div className={styles.list}>
        {projectMember.map((item, index) => (
          <React.Fragment key={item.userId}>
            {openEvaluationModals[item.userId] && (
              <DialogModal
                title="팀원평가"
                modalContent={
                  <TeamEvaluationModal
                    targetUserId={item.userId}
                    onClick={() =>
                      handleCloseModals(item.userId, setOpenEvaluationModals)
                    }
                    nickname={item.nickName}
                  />
                }
                closeModal={() =>
                  handleCloseModals(item.userId, setOpenEvaluationModals)
                }
              />
            )}

            {openExitVoteModals[item.userId] &&
              (voteData.length === 0 &&
              projectMember[0].userId === item.userId ? (
                <InfoModal
                  doubleButton
                  buttonText="퇴출"
                  onClick={() => {
                    if (projectMember.length === 2) {
                      exitTeamLeader(item.userId, projectId)
                      router.push('/mypage/myproject')
                    } else {
                      createVote(item.userId)
                    }
                    handleCloseModals(item.userId, setOpenExitVoteModals)
                  }}
                  buttonText2="취소"
                  onClose={() =>
                    handleCloseModals(item.userId, setOpenExitVoteModals)
                  }
                >
                  <>
                    <span className={styles.bold}>{item.nickName}</span>
                    님을
                    <br />
                    프로젝트에서 퇴출하시겠습니까?
                    <br />
                    프로젝트 팀장을 퇴출하면 <br /> 프로젝트가 삭제돼요.
                  </>
                </InfoModal>
              ) : voteData.length === 0 && projectMember.length === 2 ? (
                <InfoModal
                  doubleButton
                  buttonText="퇴출"
                  onClick={() => {
                    exitTeamMember(item.userId, projectId)
                    handleCloseModals(item.userId, setOpenExitVoteModals)
                  }}
                  buttonText2="취소"
                  onClose={() =>
                    handleCloseModals(item.userId, setOpenExitVoteModals)
                  }
                >
                  <>
                    <span className={styles.bold}>{item.nickName}</span>
                    님을
                    <br />
                    프로젝트에서 퇴출하시겠습니까?
                  </>
                </InfoModal>
              ) : voteData.length === 0 ? (
                <InfoModal
                  doubleButton
                  buttonText="진행"
                  onClick={() => {
                    createVote(item.userId)
                    handleCloseModals(item.userId, setOpenExitVoteModals)
                  }}
                  buttonText2="취소"
                  onClose={() =>
                    handleCloseModals(item.userId, setOpenExitVoteModals)
                  }
                >
                  <>
                    <span className={styles.bold}>{item.nickName}</span>
                    님의
                    <br />
                    프로젝트 퇴출 투표를 진행할까요?
                  </>
                </InfoModal>
              ) : (
                <InfoModal
                  doubleButton
                  buttonText="찬성"
                  onClick={() => {
                    sendVote(true, item.userId)
                  }}
                  buttonText2="반대"
                  onClose={() => {
                    sendVote(false, item.userId)
                  }}
                >
                  <>
                    <span className={styles.bold}>{item.nickName}</span>
                    님을
                    <br />
                    퇴출하시겠습니까?
                  </>
                </InfoModal>
              ))}

            {openSendVoteModals[item.userId] && (
              <InfoModal
                buttonText="확인"
                onClick={() =>
                  handleCloseModals(item.userId, setOpenSendVoteModals)
                }
              >
                퇴출 투표가 완료되었습니다. <br />
                24시간 내에 모든 팀원이 투표를 <br />
                완료해야 퇴출여부가 결정됩니다.
              </InfoModal>
            )}

            <div className={styles.item}>
              <p className={styles.title}>{index === 0 ? '팀장' : '팀원'}</p>
              <div className={styles.userArea}>
                <div className={styles.profile}>
                  <UserProfileImg
                    userProfile={item.profileImage}
                    width={32}
                    height={32}
                  />
                </div>
                <p className={styles.nickname}>{item.nickName}</p>
                {remainingTime !== '만료' &&
                  voteData[0]?.targetUserId === item.userId && (
                    <p className={styles.exitText}>
                      퇴출투표 진행중({votedMembers?.length}/{voteData.length})
                      | 남은시간(
                      {remainingTime})
                    </p>
                  )}
              </div>
              {loginUserId !== item.userId && item.review === true ? (
                <p key={item.userId} className={styles.complete}>
                  평가가 완료되었습니다.
                </p>
              ) : (
                <div key={item.userId} className={styles.buttonArea}>
                  <Button
                    type="button"
                    disabled={
                      status === '프로젝트완료' ||
                      loginUserId === item.userId ||
                      (voteData.length !== 0 &&
                        voteData[0]?.targetUserId !== item.userId) ||
                      voteData.some(
                        (voteItem) =>
                          voteItem.userId === loginUserId &&
                          voteItem.voted === true,
                      )
                    }
                    gray
                    onClick={() =>
                      handleOpenModals(item.userId, setOpenExitVoteModals)
                    }
                  >
                    퇴출하기
                  </Button>
                  <Button
                    disabled={
                      status !== '프로젝트완료' || loginUserId === item.userId
                    }
                    type="button"
                    gray
                    onClick={() =>
                      handleOpenModals(item.userId, setOpenEvaluationModals)
                    }
                  >
                    평가하기
                  </Button>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      {projectMember[0].userId === loginUserId && (
        <Button type="button" onClick={handleOpenModal}>
          팀원추가
        </Button>
      )}
    </div>
  )
}

export default TeamInfo
