import RadioInput from '@/components/common/radioInput/RadioInput'
import styles from './teamEvaluationModal.module.css'
import Button from '@/components/common/button/Button'
import { Controller, useForm } from 'react-hook-form'
import React from 'react'

interface formDataType {
  manner: number
  contribution: number
  communication: number
  schedule: number
  professionalism: number
}

interface TeamEvaluationProps {
  nickname: string
  onClick: () => void
}

const TeamEvaluationModal = ({ nickname, onClick }: TeamEvaluationProps) => {
  const scoreItem = ['1점', '2점', '3점', '4점', '5점']
  const TeamEvaluationItem = [
    { title: '매너지수', name: 'manner' } as const,
    { title: '프로젝트 기여도', name: 'contribution' } as const,
    { title: '소통능력', name: 'communication' } as const,
    { title: '일정 준수', name: 'schedule' } as const,
    { title: '전문성 준수', name: 'professionalism' } as const,
  ]

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formDataType>({ mode: 'onChange' })

  const onSubmit = async (data: formDataType) => {
    try {
      onClick()
      console.log(data)
    } catch (err) {
      console.error('오류', err)
    }
  }

  return (
    <React.Fragment key={nickname}>
      <p className={styles.title}>
        <span className={styles.nickname}>{nickname}</span>
        님에 대한 평가를 진행해주세요.
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.list}>
          {TeamEvaluationItem.map((section) => (
            <React.Fragment key={section.name}>
              <Controller
                control={control}
                name={section.name}
                rules={{ required: `${section.title} 항목을 선택해주세요.` }}
                render={({ field: { onChange, value } }) => (
                  <div className={styles.section}>
                    <p className={styles.sectionTitle}>{section.title}</p>
                    {scoreItem.map((item, index) => (
                      <RadioInput
                        key={`${section.name}_${item}`}
                        name={section.name}
                        value={index + 1}
                        checked={value === index + 1}
                        onChange={() => onChange(index + 1)}
                      >
                        {item}
                      </RadioInput>
                    ))}
                  </div>
                )}
              />
              {errors[section.name] && (
                <p className={styles.errorMsg}>
                  {errors[section.name]?.message}
                </p>
              )}
            </React.Fragment>
          ))}
        </div>
        <Button type="submit" fill>
          완료
        </Button>
      </form>
    </React.Fragment>
  )
}

export default TeamEvaluationModal
