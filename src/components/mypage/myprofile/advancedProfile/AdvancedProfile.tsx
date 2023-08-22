import styles from './advancedProfile.module.css'
import Button from '@/components/common/button/Button'

const AdvancedProfile = () => {
  return (
    <div className={styles.advancedProfile}>
      <div className={styles.advancedProfileItem}>
        <div className={styles.textArea}>
          <p className={styles.title}>경력</p>
          <p className={styles.desc}>경력을 추가해주세요.</p>
        </div>
        <Button>추가하기</Button>
      </div>
      <div className={styles.advancedProfileItem}>
        <div className={styles.textArea}>
          <p className={styles.title}>기술스택</p>
          <p className={styles.desc}>사용하는 기술스택을 추가해주세요.</p>
        </div>
        <Button>추가하기</Button>
      </div>
      <div className={styles.advancedProfileItem}>
        <div className={styles.textArea}>
          <p className={styles.title}>프로젝트 참여 이력</p>
          <p className={styles.desc}>아직 프로젝트에 참여하지 않았어요.</p>
        </div>
      </div>
      <div className={styles.advancedProfileItem}>
        <div className={styles.textArea}>
          <p className={styles.title}>업적</p>
          <p className={styles.desc}>
            프로젝트에 참여해서 업적을 달성해보세요!
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdvancedProfile