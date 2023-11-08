import RadioInput from '@/components/common/radioInput/RadioInput'
import styles from './teamEvaluationModal.module.css'
import Button from '@/components/common/button/Button'
import { Controller, useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { BadgeDataType } from '@/types/admin/adminDataType'
import { fetchData } from '@/utils/fetchData'
import useMyProject from '@/hooks/queries/useMyProject'
import { useRouter } from 'next/router'
import { reviewData } from '@/types/users/myprojectDataType'

interface formDataType {
  [key: string]: number
}

interface TeamEvaluationProps {
  nickname: string
  targetUserId: number
  onClick: () => void
}

const TeamEvaluationModal = ({
  nickname,
  onClick,
  targetUserId,
}: TeamEvaluationProps) => {
  const router = useRouter()
  const projectId = Number(router.query.id)

  const scoreItem = ['-2점', '-1점', '0점', '1점', '2점']
  const TeamEvaluationItem = [
    { title: '매너지수', name: '매너왕' } as const,
    { title: '프로젝트 기여도', name: '재능기부왕' } as const,
    { title: '소통능력', name: '소통왕' } as const,
    { title: '일정 준수', name: '마감왕' } as const,
    { title: '전문성 준수', name: '척척박사' } as const,
  ]

  const [badgeData, setBadgeData] = useState<BadgeDataType[]>([])
  useEffect(() => {
    fetchData('/admin/badges', setBadgeData)
  }, [])

  const { addProjectReview } = useMyProject()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formDataType>({ mode: 'onChange' })

  const onSubmit = async (data: formDataType) => {
    try {
      const result: reviewData[] = []
      badgeData.forEach((badge) => {
        const { id, name, image } = badge
        const point = data[name] || 0
        result.push({ badgeDto: { id, name, image }, point })
      })
      await addProjectReview.mutateAsync({ projectId, targetUserId, result })

      onClick()
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
                        value={index - 2}
                        checked={value === index - 2}
                        onChange={() => onChange(index - 2)}
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
