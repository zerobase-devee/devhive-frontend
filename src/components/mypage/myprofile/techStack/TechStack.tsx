import Button from '@/components/common/button/Button'
import styles from './techStack.module.css'

interface TechStackProps {
  onClose: () => void
}

const TechStack = ({ onClose }: TechStackProps) => {
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

export default TechStack
