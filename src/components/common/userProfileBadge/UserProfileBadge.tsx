import styles from './userProfileBadge.module.css'

interface UserProfileBadgeProps {
  title: string
  state: string
  red?: boolean
  yellow?: boolean
}

const UserProfileBadge = ({
  title,
  state,
  red,
  yellow,
}: UserProfileBadgeProps) => {
  return (
    <div
      className={`${styles.badge} ${red && styles.red} ${
        yellow && styles.yellow
      }`}
    >
      <span className={styles.title}>{title}</span>
      <span className={styles.state}>{state}</span>
    </div>
  )
}

export default UserProfileBadge
