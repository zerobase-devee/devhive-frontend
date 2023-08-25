import Button from '@/components/common/button/Button'
import styles from './detailInfo.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import ProjectBadge from '@/components/common/projectBadge/ProjectBadge'
import { ProjectInfoProps } from '@/types/mypageDataType'
import { useState } from 'react'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import { Controller, useForm } from 'react-hook-form'

interface projectStatusDataType {
  status: string
}

const ProjectInfo = ({
  projectId,
  projectName,
  deadline,
  projectStatus,
  startDate,
  endDate,
  leader,
}: ProjectInfoProps) => {
  const [isModify, setIsModify] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<projectStatusDataType>({
    mode: 'onChange',
    defaultValues: {
      status: projectStatus !== null ? projectStatus : '',
    },
  })

  const handleModify = () => {
    setIsModify(!isModify)
  }

  const onSubmit = async (data: projectStatusDataType) => {
    handleModify()
    try {
      console.log(data)
    } catch (err) {
      console.error('오류', err)
    }
  }

  const calculateDday = (deadline: string) => {
    const today = new Date()
    const target = new Date(deadline)
    const day = 24 * 60 * 60 * 1000
    const diffDays = Math.floor((target.getTime() - today.getTime()) / day)

    if (diffDays === 0) {
      return 'D-day'
    } else if (diffDays > 0) {
      return `D-${diffDays}`
    } else {
      return '모집이 완료되었습니다.'
    }
  }

  const projectDate = () => {
    if (startDate !== null && endDate !== null) {
      return (
        <>
          <span>시작: </span>
          {startDate}
          <span> ~ </span>
          <span>종료: </span>
          {endDate}
        </>
      )
    } else if (startDate !== null) {
      return (
        <>
          <span>시작: </span>
          {startDate}
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
      <div className={styles.item}>
        <p className={styles.title}>팀원모집일정</p>
        <p className={styles.data}>{calculateDday(deadline)}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.title}>프로젝트진행</p>
        {leader &&
          (!isModify ? (
            <>
              <ProjectBadge
                red={projectStatus !== '프로젝트완료'}
                green={projectStatus === '프로젝트완료'}
              >
                {projectStatus}
              </ProjectBadge>
              <Button type="button" onClick={handleModify} gray>
                수정하기
              </Button>
            </>
          ) : (
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
                      setSelectedItem={onChange}
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
          ))}
      </div>
      <div className={styles.item}>
        <p className={styles.title}>프로젝트일정</p>
        <p className={styles.data}>{projectDate()}</p>
      </div>
    </div>
  )
}

export default ProjectInfo
