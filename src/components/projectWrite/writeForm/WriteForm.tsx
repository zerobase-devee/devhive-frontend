import ProjectBadge from '@/components/common/projectBadge/ProjectBadge'
import styles from './writeForm.module.css'
import dynamic from 'next/dynamic'
import RadioInput from '@/components/common/radioInput/RadioInput'
import { Controller, useForm } from 'react-hook-form'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import { SELECTED_BOX_DATA } from '@/constants/selectedBoxData'
import Button from '@/components/common/button/Button'
import TechStackSelectedBox from '@/components/techStack/techStackSelected/TechStackSelectedBox'
import { techStackData } from 'public/data/techStackData'
import useTechStack from '@/hooks/useTechStack'
import TechStackSelectedList from '@/components/techStack/techStackSelected/TechStackSelectedList'
import { formatDateForSending } from '@/utils/formatDate'
import LinkButton from '@/components/common/button/LinkButton'

const TextEditor = dynamic(
  () => import('@/components/projectWrite/textEditor/TextEditor'),
  {
    ssr: false,
  },
)

interface WriteFormDataType {
  title: string
  name: string
  developmentType: string
  recruitmentType: string
  region: string | null
  content: string
  teamSize: string
  deadline: string
}

interface WriteFormProps {
  techStack?: number[]
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
  const developmentType = ['전체', '프론트엔드', '백엔드', '풀스택']
  const recruitmentType = ['온라인', '오프라인', '온/오프라인']
  const teamSizeType = ['1명', '2명', '3명', '4명', '0명', '00명']
  const deadlineType = ['30일', '60일', '90일']
  const isTechStack = techStack !== undefined ? techStack : []
  const { handleItemToggle, selectedItems } = useTechStack({
    defaults: isTechStack,
  })

  const {
    handleSubmit,
    control,
    watch,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<WriteFormDataType>({
    mode: 'onChange',
    defaultValues: {
      title: title,
      name: name,
      developmentType: development,
      recruitmentType: recruitment,
      region: region,
      content: content,
      teamSize: teamSize,
      deadline: deadline,
    },
  })

  const isOnline = watch('recruitmentType') === '온라인'

  const onSubmit = (data: WriteFormDataType) => {
    if (data.recruitmentType === '온라인') {
      data.region = null
    }
    data.deadline = formatDateForSending(data.deadline)
    const team = parseInt(data.teamSize)
    const writeData = {
      ...data,
      teamSize: team,
      techStack: selectedItems,
    }

    console.log(writeData)
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
                {developmentType.map((item) => (
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
                    {recruitmentType.map((item) => (
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
                    menu={teamSizeType}
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
            <Controller
              control={control}
              name="deadline"
              rules={{ required: '모집 마감일을 입력해주세요.' }}
              render={({ field: { onChange, value } }) => (
                <div className={styles.formItem}>
                  <p className={styles.formItemTitle}>모집마감일</p>
                  <SelectedBox
                    menu={deadlineType}
                    placeholder="마감일 선택"
                    selectedItem={value}
                    setSelectedItem={(selected) => {
                      onChange(selected)
                    }}
                  />
                </div>
              )}
            />
            {errors.deadline && (
              <p className={styles.errorMsg}>{errors.deadline.message}</p>
            )}
          </div>
        </div>
        <div>
          <div className={`${styles.formItem} ${styles.techStack}`}>
            <p className={styles.formItemTitle}>기술스택</p>
            <TechStackSelectedBox
              data={techStackData}
              selectedItems={selectedItems}
              handleItemToggle={handleItemToggle}
            />
            <TechStackSelectedList
              data={techStackData}
              selectedItems={selectedItems}
            />
          </div>
        </div>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="프로젝트명을 입력하세요."
          {...register('name', {
            required: '프로젝트명을 입력해주세요.',
            maxLength: {
              value: 50,
              message: '프로젝트명은 50자까지 입력할 수 있어요.',
            },
          })}
        />
        {errors.title && (
          <p className={styles.errorMsg}>{errors.title.message}</p>
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
              !isDirty ||
              !isValid ||
              selectedItems.length === 0 ||
              (!isOnline && !watch('region'))
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
