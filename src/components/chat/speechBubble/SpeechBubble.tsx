import styles from './speechBubble.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'

interface SpeechBubbleProps {
  received: boolean
  message: string
  nickname?: string
  profileImg: string | null
  time: string
}

const SpeechBubble = ({
  received,
  message,
  nickname,
  profileImg,
  time,
}: SpeechBubbleProps) => {
  return (
    <>
      {received && (
        <div className={styles.user}>
          <UserProfileImg userProfile={profileImg} width={40} height={40} />
          <p>{nickname}</p>
        </div>
      )}
      <div
        className={`${styles.container} ${
          received ? styles.receivedContainer : ''
        }`}
      >
        <div
          className={`${styles.status} ${
            received ? styles.receivedStatus : ''
          }`}
        >
          <p>{time}</p>
        </div>

        <div
          className={`${styles.message} ${received ? styles.receivedMsg : ''}`}
        >
          <p>{message}</p>
        </div>
      </div>
    </>
  )
}

export default SpeechBubble
