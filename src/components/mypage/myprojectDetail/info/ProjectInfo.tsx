import Button from '@/components/common/button/Button'
import styles from './detailInfo.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import ProjectBadge from '@/components/common/projectBadge/ProjectBadge'
import { useState } from 'react'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import { Controller, useForm } from 'react-hook-form'
import useModal from '@/hooks/useModal'
import InfoModal from '@/components/common/modal/InfoModal'
import { calculateDday, formatDateToYYYYMMDD } from '@/utils/formatDate'
import { ProjectInfoDataType } from '@/types/users/myprojectDataType'
import useMyProject from '@/hooks/queries/useMyProject'
import { postCreateChatRoom, postEnterChatRoom } from '@/apis/chat/chat'
import { useRouter } from 'next/router'

interface projectStatusDataType {
  readonly status: string
}

const ProjectInfo = ({
  roomId,
  projectId,
  projectName,
  deadline,
  status,
  startDate,
  endDate,
  leader,
}: ProjectInfoDataType) => {
  const router = useRouter()
  const { editProjectStatusMutation } = useMyProject()
  const { openModal, handleCloseModal, handleOpenModal } = useModal()
  const [isModify, setIsModify] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<projectStatusDataType>({
    mode: 'onChange',
    defaultValues: {
      status: status !== null ? status : '',
    },
  })

  const handleModify = () => {
    setIsModify(!isModify)
  }

  const translateStatusToEng = (status: string) => {
    if (status === '모집중') {
      return {
        status: 'RECRUITING' as 'RECRUITING',
      }
    } else if (status === '팀원재모집') {
      return {
        status: 'RE_RECRUITMENT' as 'RE_RECRUITMENT',
      }
    } else if (status === '프로젝트완료') {
      return {
        status: 'COMPLETE' as 'COMPLETE',
      }
    } else {
      return {
        status: 'RECRUITMENT_COMPLETE' as 'RECRUITMENT_COMPLETE',
      }
    }
  }

  const createChatRoom = async () => {
    try {
      await postCreateChatRoom(projectId, projectName)
    } catch (error) {
      console.error(error)
    }
  }

  const enterChatRoom = async () => {
    try {
      if (roomId) {
        await postEnterChatRoom(roomId)
        router.push('/chat')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (data: projectStatusDataType) => {
    try {
      const status = translateStatusToEng(data.status)
      await editProjectStatusMutation.mutateAsync({ projectId, status })
      handleModify()
    } catch (err) {
      console.error('오류', err)
    }
  }

  const projectDate = () => {
    if (startDate !== null && endDate !== null) {
      return (
        <>
          <span>시작: </span>
          {formatDateToYYYYMMDD(startDate)}
          <span> ~ </span>
          <span>종료: </span>
          {formatDateToYYYYMMDD(endDate)}
        </>
      )
    } else if (startDate !== null) {
      return (
        <>
          <span>시작: </span>
          {formatDateToYYYYMMDD(startDate)}
        </>
      )
    } else {
      return '프로젝트 일정이 등록되지 않았습니다.'
    }
  }

  return (
    <div className={styles.list}>
      <div className={styles.item}>
        <p className={styles.title}>프로젝트명</p>
        <p className={styles.data}>{projectName}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.title}>모집글</p>
        <LinkButton href={`/project/${projectId}`} gray>
          확인하기
        </LinkButton>
      </div>
      {leader ? (
        <div className={styles.item}>
          <p className={styles.title}>프로젝트채팅방</p>
          {roomId ? (
            <Button type="button" onClick={enterChatRoom} gray>
              참여하기
            </Button>
          ) : (
            <Button type="button" onClick={createChatRoom} gray>
              생성하기
            </Button>
          )}
        </div>
      ) : (
        <div className={styles.item}>
          <p className={styles.title}>프로젝트채팅방</p>
          <Button
            disabled={roomId ? false : true}
            type="button"
            onClick={enterChatRoom}
            gray
          >
            참여하기
          </Button>
        </div>
      )}
      <div className={styles.item}>
        <p className={styles.title}>팀원모집일정</p>
        <p className={styles.data}>{calculateDday(deadline)}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.title}>프로젝트진행</p>
        {!isModify ? (
          <ProjectBadge
            red={status !== '프로젝트완료'}
            green={status === '프로젝트완료'}
          >
            {status}
          </ProjectBadge>
        ) : null}
        {!leader || status === '프로젝트완료' ? null : !isModify ? (
          <>
            <Button type="button" onClick={handleModify} gray>
              수정하기
            </Button>
          </>
        ) : (
          <>
            {openModal && (
              <InfoModal buttonText="확인" onClick={handleCloseModal}>
                프로젝트 시작단계로 전환되면 <br />
                프로젝트 모집글을 삭제할 수 없어요.
              </InfoModal>
            )}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  control={control}
                  name="status"
                  rules={{ required: '프로젝트 진행도를 선택해주세요.' }}
                  render={({ field: { onChange, value } }) => (
                    <SelectedBox
                      menu={['프로젝트시작', '팀원재모집', '프로젝트완료']}
                      placeholder="진행도 선택"
                      selectedItem={value}
                      setSelectedItem={(selected) => {
                        onChange(selected)
                        if (selected !== '프로젝트시작') {
                          return
                        } else {
                          handleOpenModal()
                        }
                      }}
                    />
                  )}
                />
                {errors.status && <p>{errors.status.message}</p>}
              </div>

              <div className={styles.buttonArea}>
                <Button type="button" onClick={handleModify} gray>
                  취소
                </Button>
                <Button type="submit">저장</Button>
              </div>
            </form>
          </>
        )}
      </div>
      <div className={styles.item}>
        <p className={styles.title}>프로젝트일정</p>
        <p className={styles.data}>{projectDate()}</p>
      </div>
    </div>
  )
}

export default ProjectInfo
