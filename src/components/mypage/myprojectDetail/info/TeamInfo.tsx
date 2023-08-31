import styles from './detailInfo.module.css'
import React, { useEffect, useState } from 'react'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import {
  ProjectMemberDataType,
  projectExitVoteDataType,
} from '@/types/mypageDataType'
import Button from '@/components/common/button/Button'
import DialogModal from '@/components/common/modal/DialogModal'
import TeamEvaluationModal from '../modal/TeamEvaluationModal'
import useModal from '@/hooks/useModal'
import ApplicantUserModal from '../modal/ApplicantUserModal'
import InfoModal from '@/components/common/modal/InfoModal'

interface TeamInfoProps {
  writer: number
  teamData: ProjectMemberDataType[]
  status: string
  reviwerId: number[]
  projectExitVote: projectExitVoteDataType | null
}

const TeamInfo = ({
  teamData,
  writer,
  status,
  reviwerId,
  projectExitVote,
}: TeamInfoProps) => {
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

  const [isSendVote, SetIsSendVote] = useState(false)

  const handleOpenModals = (
    userId: number,
    setOpenModals: React.Dispatch<
      React.SetStateAction<{ [key: number]: boolean }>
    >,
  ) => {
    document.body.classList.add('modalOpen')
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
    document.body.classList.remove('modalOpen')
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
      if (!projectExitVote) {
        return
      } else {
        countDown24Hours(projectExitVote.createdDate)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectExitVote?.createdDate])

  const votedMembers = projectExitVote?.votedMemberList.filter(
    (member) => member.isVoted === true,
  )

  const createVote = (targetUserId: number) => {
    console.log(targetUserId)
  }

  const sendVote = (voteValue: boolean) => {
    SetIsSendVote(true)
    console.log(voteValue)
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
        {teamData.map((item, index) => (
          <React.Fragment key={item.userId}>
            {openEvaluationModals[item.userId] && (
              <DialogModal
                title="팀원평가"
                modalContent={
                  <TeamEvaluationModal
                    onClick={() =>
                      handleCloseModals(item.userId, setOpenEvaluationModals)
                    }
                    nickname={item.nickname}
                  />
                }
                closeModal={() =>
                  handleCloseModals(item.userId, setOpenEvaluationModals)
                }
              />
            )}

            {openExitVoteModals[item.userId] &&
              (projectExitVote === null ? (
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
                    <span className={styles.bold}>{item.nickname}</span>
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
                    sendVote(true)
                    handleCloseModals(item.userId, setOpenExitVoteModals)
                    handleOpenModals(item.userId, setOpenSendVoteModals)
                  }}
                  buttonText2="반대"
                  onClose={() => {
                    sendVote(false)
                    handleCloseModals(item.userId, setOpenExitVoteModals)
                    handleOpenModals(item.userId, setOpenSendVoteModals)
                  }}
                >
                  <>
                    <span className={styles.bold}>{item.nickname}</span>
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
                <p className={styles.nickname}>{item.nickname}</p>
                {remainingTime !== '만료' &&
                  projectExitVote?.targetUserId === item.userId && (
                    <p className={styles.exitText}>
                      퇴출투표 진행중({votedMembers?.length}/
                      {projectExitVote.votedMemberList.length}) | 남은시간(
                      {remainingTime})
                    </p>
                  )}
              </div>
              {writer !== item.userId &&
                (reviwerId.includes(item.userId) ? (
                  <p className={styles.complete}>평가가 완료되었습니다.</p>
                ) : (
                  <div className={styles.buttonArea}>
                    <Button
                      type="button"
                      disabled={
                        status === '프로젝트완료' ||
                        (projectExitVote !== null &&
                          projectExitVote?.targetUserId !== item.userId) ||
                        isSendVote === true
                      }
                      gray
                      onClick={() =>
                        handleOpenModals(item.userId, setOpenExitVoteModals)
                      }
                    >
                      퇴출하기
                    </Button>
                    <Button
                      disabled={status !== '프로젝트완료'}
                      type="button"
                      gray
                      onClick={() =>
                        handleOpenModals(item.userId, setOpenEvaluationModals)
                      }
                    >
                      평가하기
                    </Button>
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      <Button type="button" onClick={handleOpenModal}>
        팀원추가
      </Button>
    </div>
  )
}

export default TeamInfo
