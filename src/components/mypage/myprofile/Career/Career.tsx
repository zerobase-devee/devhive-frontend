import Button from '@/components/common/button/Button'
import styles from './career.module.css'
import { Controller, useForm } from 'react-hook-form'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import { useEffect, useState } from 'react'

interface CareerProps {
  onClose: () => void
}

interface CareerData {
  readonly company: string
  readonly position: string
  readonly startDate: string
  readonly endDate: string
}

const Career = ({ onClose }: CareerProps) => {
  const [isStartDateEmpty, setIsStartDateEmpty] = useState(true)
  const [isEndDateEmpty, setIsEndDateEmpty] = useState(true)
  const [selectedItem, setSelectedItem] = useState('')
  const [endDateDisabled, setEndDateDisabled] = useState(false)
  const [isEmployment, SetisEmployment] = useState(false)

  useEffect(() => {
    if (selectedItem === '' && !isStartDateEmpty) {
      SetisEmployment(false)
    } else {
      SetisEmployment(true)
    }
    if (selectedItem === '재직중') {
      setEndDateDisabled(true)
    } else {
      setEndDateDisabled(false)
    }
  }, [selectedItem, isStartDateEmpty])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
    control,
  } = useForm<CareerData>({
    mode: 'onChange',
  })

  const onSubmit = (data: CareerData) => {
    onClose()
    console.log(data)
    reset()
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <input
            className={`${styles.input} ${errors.company && styles.inputError}`}
            type="text"
            placeholder="회사명을 입력해주세요."
            {...register('company', {
              required: '회사명을 입력해주세요.',
            })}
          />
          <p className={styles.errorMsg}>{errors.company?.message}</p>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={`${styles.input} ${
              errors.position && styles.inputError
            }`}
            type="text"
            placeholder="직책을 입력해주세요."
            {...register('position', {
              required: '직책을 입력해주세요.',
            })}
          />
          <p className={styles.errorMsg}>{errors.position?.message}</p>
        </div>
        <div className={styles.date}>
          <SelectedBox
            placeholder="재직여부"
            menu={['재직중', '퇴사']}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <div className={styles.inputContainer}>
            <input
              className={`${styles.dateInput} ${
                isStartDateEmpty ? styles.dateEmpty : ''
              } ${!isEmployment && styles.inputError}`}
              placeholder="입사일"
              type="date"
              {...register('startDate', {
                onChange: () => {
                  setIsStartDateEmpty(false)
                },
                required: '입사일을 입력해주세요.',
              })}
            />
            {!isEmployment && (
              <p className={styles.errorMsg}>재직여부를 먼저 선택해주세요.</p>
            )}
          </div>
          <p>~</p>
          <div className={styles.inputContainer}>
            <input
              className={`${styles.dateInput} ${
                isEndDateEmpty ? styles.dateEmpty : ''
              } ${errors.endDate && styles.inputError}`}
              placeholder="퇴사일"
              disabled={endDateDisabled}
              type="date"
              {...register('endDate', {
                onChange: () => {
                  setIsEndDateEmpty(false)
                },
                validate: {
                  required: () => {
                    if (!endDateDisabled && !watch('endDate'))
                      return '퇴사일을 선택해주세요.'
                  },
                  validateEndDate: () => {
                    const startDate = getValues('startDate')
                    const endDate = getValues('endDate')
                    if (startDate && endDate) {
                      if (endDate <= startDate) {
                        return '퇴사일은 입사일 이후여야 해요.'
                      }
                    }
                  },
                },
              })}
            />
            <p className={styles.errorMsg}>{errors.endDate?.message}</p>
          </div>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Button type="button" onClick={onClose}>
          취소
        </Button>
        <Button type="submit" fill>
          저장
        </Button>
      </div>
    </form>
  )
}

export default Career
