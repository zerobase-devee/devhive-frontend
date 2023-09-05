import styles from './projectBadge.module.css'

interface ProjectBadgeProps {
  children: React.ReactNode
  red?: boolean
  green?: boolean
}

const ProjectBadge = ({ children, red, green }: ProjectBadgeProps) => {
  return (
    <span
      className={`${styles.badge} ${
        red ? styles.red : green ? styles.green : styles.yellow
      }`}
    >
      {children}
    </span>
  )
}

export default ProjectBadge
