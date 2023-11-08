import ProjectBadge from '@/components/common/projectBadge/ProjectBadge'
import styles from './writeForm.module.css'
import dynamic from 'next/dynamic'
import RadioInput from '@/components/common/radioInput/RadioInput'
import { Controller, useForm } from 'react-hook-form'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import { SELECTED_BOX_DATA } from '@/constants/selectedBoxData'
import Button from '@/components/common/button/Button'
import TechStackSelectedBox from '@/components/techStack/techStackSelected/TechStackSelectedBox'
import useTechStack from '@/hooks/useTechStack'
import TechStackSelectedList from '@/components/techStack/techStackSelected/TechStackSelectedList'
import LinkButton from '@/components/common/button/LinkButton'
import { formatDateToYYYYMMDD } from '@/utils/formatDate'
import { useRouter } from 'next/router'
import { TechStackDataType } from '@/types/admin/adminDataType'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils/fetchData'
import { postProject } from '@/apis/project/projects'
import { ProjectDataType } from '@/types/project/projectDataType'
import useProjectDetail from '@/hooks/queries/useProjectDetail'

const TextEditor = dynamic(
  () => import('@/components/projectWrite/textEditor/TextEditor'),
  {
    ssr: false,
  },
)

interface WriteFormProps {
  techStack?: TechStackDataType[]
  title?: string
  name?: string
  development?: string
  recruitment?: string
  region?: string | null
  content?: string
  teamSize?: string
  deadline?: string
  modify?: boolean
}

const WriteForm = ({
  techStack,
  title,
  name,
  development,
  recruitment,
  region,
  content,
  teamSize,
  deadline,
  modify,
}: WriteFormProps) => {
  const { editProjectDetail } = useProjectDetail()
  const isTechStack = techStack !== undefined ? techStack : []
  const {
    handleItemToggle,
    setSelectedTechStacks,
    selectedTechStacks,
    selectedItems,
  } = useTechStack(isTechStack)
  const router = useRouter()
  const [techStackData, setTechStackData] = useState<TechStackDataType[]>([])

  useEffect(() => {
    fetchData('/admin/tech-stacks', setTechStackData)
  }, [])

  const {
    handleSubmit,
    control,
    watch,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProjectDataType>({
    mode: 'onChange',
    defaultValues: {
      title: title,
      projectName: name,
      developmentType: development,
      recruitmentType: recruitment,
      region: region,
      content: content,
      teamSize: teamSize,
      deadline: deadline,
    },
  })

  const isOnline = watch('recruitmentType') === '온라인'

  const recruitmentTypeData = (recruitmentType: string) => {
    if (recruitmentType === '온라인') return 'ONLINE' as 'ONLINE'
    else if (recruitmentType === '오프라인') return 'OFFLINE' as 'OFFLINE'
    else return 'ALL' as 'ALL'
  }

  const developmentTypeData = (developmentType: string) => {
    if (developmentType === '프론트엔드') return 'FRONTEND' as 'FRONTEND'
    else if (developmentType === '백엔드') return 'BACKEND' as 'BACKEND'
    else if (developmentType === '풀스택') return 'FULLSTACK' as 'FULLSTACK'
    else return 'ALL' as 'ALL'
  }

  const onSubmit = async (data: ProjectDataType) => {
    const writeData = {
      ...data,
      recruitmentType: recruitmentTypeData(data.recruitmentType),
      developmentType: developmentTypeData(data.developmentType),
      region: data.recruitmentType === '온라인' ? null : data.region,
      deadline: `${data.deadline}T00:00:00`,
      teamSize: parseInt(data.teamSize) + 1,
      techStacks: selectedItems,
    }
    if (modify) {
      const projectId = Number(router.query.id)
      await editProjectDetail.mutateAsync({ projectId, writeData })
      router.push(`/project/${projectId}`)
    } else {
      const data = await postProject(writeData)
      router.push(`/project/${data.projectId}`)
    }
  }

  const dateMax = () => {
    const today = new Date()
    const MaxDay = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)
    const max = formatDateToYYYYMMDD(MaxDay)
    return max
  }

  return (
    <>
      <ProjectBadge red>모집중</ProjectBadge>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="제목을 입력하세요."
          {...register('title', {
            required: '게시글 제목을 입력해주세요.',
            maxLength: {
              value: 50,
              message: '게시글 제목은 50자까지 입력할 수 있어요.',
            },
          })}
        />
        {errors.title && (
          <p className={styles.errorMsg}>{errors.title.message}</p>
        )}
        <Controller
          control={control}
          name={'developmentType'}
          rules={{ required: '모집분야를 선택해주세요.' }}
          render={({ field: { onChange, value } }) => (
            <div className={styles.formItem}>
              <p className={styles.formItemTitle}>모집분야</p>
              <div className={styles.radioButtonArea}>
                {SELECTED_BOX_DATA.developmentType.map((item) => (
                  <RadioInput
                    key={item}
                    name="recruitmentType"
                    value={item}
                    checked={value === item}
                    onChange={() => onChange(item)}
                  >
                    {item}
                  </RadioInput>
                ))}
              </div>
            </div>
          )}
        />
        {errors.developmentType && (
          <p className={styles.errorMsg}>{errors.developmentType.message}</p>
        )}
        <div className={styles.formItemArea}>
          <div>
            <Controller
              control={control}
              name={'recruitmentType'}
              rules={{ required: '모임형태를 선택해주세요.' }}
              render={({ field: { onChange, value } }) => (
                <div className={styles.formItem}>
                  <p className={styles.formItemTitle}>모임형태</p>
                  <div className={styles.radioButtonArea}>
                    {SELECTED_BOX_DATA.recruitmentType.map((item) => (
                      <RadioInput
                        key={item}
                        name="developmentType"
                        value={item}
                        checked={value === item}
                        onChange={() => onChange(item)}
                      >
                        {item}
                      </RadioInput>
                    ))}
                  </div>
                </div>
              )}
            />
            {errors.recruitmentType && (
              <p className={styles.errorMsg}>
                {errors.recruitmentType.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="region"
              render={({ field: { onChange, value } }) => (
                <div className={styles.formItem}>
                  <p
                    className={`${styles.formItemTitle} ${
                      isOnline ? styles.disabled : ''
                    }`}
                  >
                    지역
                  </p>
                  <SelectedBox
                    scroll
                    disabled={isOnline ? true : false}
                    menu={SELECTED_BOX_DATA.region}
                    placeholder="지역 선택"
                    selectedItem={isOnline ? null : value}
                    setSelectedItem={(selected) => {
                      onChange(selected)
                      if (isOnline) {
                        reset({ region: '' })
                      }
                    }}
                  />
                </div>
              )}
            />
            {errors.region && (
              <p className={styles.errorMsg}>{errors.region.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="teamSize"
              rules={{ required: '모집인원을 선택해주세요.' }}
              render={({ field: { onChange, value } }) => (
                <div className={styles.formItem}>
                  <p className={styles.formItemTitle}>모집인원</p>
                  <SelectedBox
                    scroll
                    menu={SELECTED_BOX_DATA.teamSizeType}
                    placeholder="인원 수 선택"
                    selectedItem={value}
                    setSelectedItem={(selected) => {
                      onChange(selected)
                    }}
                  />
                </div>
              )}
            />
            {errors.teamSize && (
              <p className={styles.errorMsg}>{errors.teamSize.message}</p>
            )}
          </div>
          <div>
            <div className={styles.formItem}>
              <p className={styles.formItemTitle}>모집마감일</p>
              <input
                min={formatDateToYYYYMMDD(new Date())}
                max={dateMax()}
                className={styles.dateInput}
                type="date"
                {...register('deadline', {
                  required: '모집 마감일을 입력해주세요.',
                  validate: () => {
                    if (watch('deadline') < formatDateToYYYYMMDD(new Date()))
                      return '현재 날짜보다 이전의 날짜는 선택할 수 없어요.'
                  },
                })}
              />
            </div>
            {errors.deadline && (
              <p className={styles.errorMsg}>{errors.deadline.message}</p>
            )}
          </div>
        </div>
        <div>
          <div className={`${styles.formItem} ${styles.techStack}`}>
            <p className={styles.formItemTitle}>기술스택</p>
            <TechStackSelectedBox
              selectedTechStacks={selectedTechStacks}
              setSelectedTechStacks={setSelectedTechStacks}
              scroll
              techStackData={techStackData}
              selectedItems={selectedItems}
              handleItemToggle={handleItemToggle}
            />
            <TechStackSelectedList
              data={techStackData}
              selectedItems={selectedTechStacks}
            />
          </div>
        </div>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="프로젝트명을 입력하세요."
          {...register('projectName', {
            required: '프로젝트명을 입력해주세요.',
            maxLength: {
              value: 50,
              message: '프로젝트명은 50자까지 입력할 수 있어요.',
            },
          })}
        />
        {errors.projectName && (
          <p className={styles.errorMsg}>{errors.projectName.message}</p>
        )}
        <Controller
          control={control}
          name="content"
          rules={{
            required: '프로젝트 내용을 입력해주세요.',
            maxLength: {
              value: 1000,
              message: '프로젝트 내용은 최대 1000자를 넘을 수 없어요.',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextEditor
              errors={errors.content !== undefined}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors.content && (
          <p className={styles.errorMsg}>{errors.content.message}</p>
        )}
        <div className={styles.buttonArea}>
          {modify && <LinkButton href="/project">취소</LinkButton>}
          <Button
            type="submit"
            disabled={
              !modify
                ? !isDirty ||
                  !isValid ||
                  selectedItems.length === 0 ||
                  (!isOnline && !watch('region'))
                : false
            }
            fill
          >
            등록하기
          </Button>
        </div>
      </form>
    </>
  )
}

export default WriteForm
