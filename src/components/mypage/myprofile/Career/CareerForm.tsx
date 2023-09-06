import Button from '@/components/common/button/Button'
import styles from './careerForm.module.css'
import { useForm } from 'react-hook-form'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import { useEffect, useState } from 'react'
import { CareersDataType } from '@/types/users/career'
import { careers } from '@/apis/mypage/careers'
import { careersModify } from '@/apis/mypage/careersModify'

interface CareerFromProps {
  onClose: () => void
  companyData?: string
  positionData?: string
  startDateData?: string
  endDateData?: string
  modify?: boolean
  careerId?: number
}

const CareerForm = ({
  onClose,
  companyData,
  positionData,
  startDateData,
  endDateData,
  modify,
  careerId,
}: CareerFromProps) => {
  const [isStartDateEmpty, setIsStartDateEmpty] = useState(true)
  const [isEndDateEmpty, setIsEndDateEmpty] = useState(true)
  const [selectedItem, setSelectedItem] = useState('')
  const [endDateDisabled, setEndDateDisabled] = useState(false)
  const [isEmployment, SetisEmployment] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<CareersDataType>({
    mode: 'onChange',
    defaultValues: {
      company: companyData,
      position: positionData,
      startDate: startDateData,
      endDate: endDateData,
    },
  })

  useEffect(() => {
    if (modify) {
      if (getValues('startDate') !== '') {
        setSelectedItem('재직중')
        setIsStartDateEmpty(false)
      }
      if (getValues('endDate') !== '' && getValues('startDate')) {
        setIsStartDateEmpty(false)
        setIsEndDateEmpty(false)
        setSelectedItem('퇴사')
      }
    }
  }, [modify, getValues])

  useEffect(() => {
    if (selectedItem === '' && !isStartDateEmpty) {
      SetisEmployment(false)
    } else {
      SetisEmployment(true)
    }
    if (selectedItem === '재직중') {
      setEndDateDisabled(true)
      reset({ endDate: '' })
    } else {
      setEndDateDisabled(false)
    }
  }, [selectedItem, isStartDateEmpty, modify, getValues, reset])

  const onSubmit = async (data: CareersDataType) => {
    try {
      if (modify) {
        const serverSendData: CareersDataType = {
          company: data.company,
          position: data.position,
          startDate: `${data.startDate}T00:00:00`,
          endDate: data.endDate ? `${data.endDate}T00:00:00` : null,
        }
        await careersModify(serverSendData, careerId ? careerId : 0)
      } else {
        const serverSendData: CareersDataType = {
          company: data.company,
          position: data.position,
          startDate: `${data.startDate}T00:00:00`,
          endDate: data.endDate ? `${data.endDate}T00:00:00` : '',
        }
        await careers(serverSendData)
      }
      onClose()
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className={`${styles.container} ${modify && styles.modify}`}
      onSubmit={handleSubmit(onSubmit)}
    >
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
                isStartDateEmpty ? `${styles.dateEmpty} ${styles.hidden}` : ''
              } ${!isEmployment && styles.inputError}`}
              placeholder="입사일"
              type="date"
              {...register('startDate', {
                onChange: () => {
                  if (getValues('startDate')) {
                    setIsStartDateEmpty(false)
                  } else {
                    setIsStartDateEmpty(true)
                  }
                },
                validate: {
                  employmentCheck: () => {
                    if (!isEmployment) {
                      return ''
                    }
                  },
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
                isEndDateEmpty ? `${styles.dateEmpty} ${styles.hidden}` : ''
              } ${errors.endDate && styles.inputError}`}
              placeholder="퇴사일"
              disabled={endDateDisabled}
              type="date"
              {...register('endDate', {
                onChange: () => {
                  if (getValues('endDate')) {
                    setIsEndDateEmpty(false)
                  } else {
                    setIsEndDateEmpty(true)
                  }
                },
                validate: {
                  required: () => {
                    if (!endDateDisabled && !watch('endDate'))
                      return '퇴사일을 선택해주세요.'
                  },
                  startDateCheck: () => {
                    if (getValues('startDate') === '') {
                      reset({ endDate: '' })
                      return '입사일을 먼저 입력해주세요.'
                    }
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

export default CareerForm
