import Button from '@/components/common/button/Button'
import styles from './techStackForm.module.css'
import TechStackSelectedBox from '@/components/techStack/techStackSelectedBox/TechStackSelectedBox'
import { TechStackDataType } from '@/types/mypageDataType'
import { Controller, useForm } from 'react-hook-form'

interface TechStackProps {
  onClose: () => void
}

const TechStackForm = ({ onClose }: TechStackProps) => {
  const { handleSubmit, control } = useForm()

  const onSubmit = (data: any) => {
    onClose()
    console.log('Form Data:', data)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.selectBoxArea}>
        <TechStackSelectedBox />
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

export default TechStackForm
