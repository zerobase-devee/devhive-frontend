import Button from '@/components/common/button/Button'
import styles from './career.module.css'

interface CareerProps {
  onClose: () => void
}

const Career = ({ onClose }: CareerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonArea}>
        <Button type="button" onClick={onClose}>
          취소
        </Button>
        <Button type="submit" fill>
          저장
        </Button>
      </div>
    </div>
  )
}

export default Career
